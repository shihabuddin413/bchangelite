// Bchange Lite v2 Main Application Controller (Index Page)

const ALL_COIN_SYMBOLS = [
  'BTC', 'ETH', 'SOL', 'AVAX', 'ADA', 'DOT', 'MATIC', 'ATOM', 'ALGO', 'ICP', 
  'STX', 'XTZ', 'LTC', 'BCH', 'ETC', 'ZEC', 'DASH', 'XLM', 'EOS',
  'UNI', 'AAVE', 'MKR', 'CRV', 'COMP', 'SNX', '1INCH', 'SUSHI', 'YFI', 'BAL', 
  'LRC', 'KNC', 'ZRX', 'BNT',
  'SAND', 'MANA', 'APE', 'ENJ', 'CHZ', 'GMT',
  'LINK', 'GRT', 'FIL', 'LPT', 'BAND', 'SKL', 'STORJ', 'NMR',
  'USDC', 'USDT', 'DAI', 'WBTC',
  'DOGE'
];

class BchangeApp {
  constructor() {
    this.priceHistory = {};
    this.initialPrices = {};
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.viewMode = 'grid'; // 'grid' | 'list'
    this.sessionStartTime = Date.now();

    this.init();
  }

  async init() {
    this.setupDOM();
    this.renderCategoryBar();
    this.setupEventListeners();
    await this.fetchInitialPrices();
    this.startRealtimePolling();
  }

  setupDOM() {
    this.gridContainer = document.getElementById('assetsContainer');
    this.searchBox = document.getElementById('searchInput');
    this.categoriesContainer = document.getElementById('categoriesBar');
    this.roiDurationEl = document.getElementById('roiDuration');
    this.viewGridBtn = document.getElementById('viewGridBtn');
    this.viewListBtn = document.getElementById('viewListBtn');
  }

  renderCategoryBar() {
    if (!this.categoriesContainer) return;
    this.categoriesContainer.innerHTML = ASSET_CATEGORIES.map(cat => `
      <button class="category-btn ${cat.id === this.activeCategory ? 'active' : ''}" data-category="${cat.id}">
        <span>${cat.icon}</span> ${cat.name}
      </button>
    `).join('');
  }

  setupEventListeners() {
    if (this.searchBox) {
      this.searchBox.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderAssets();
      });
    }

    if (this.categoriesContainer) {
      this.categoriesContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (btn) {
          document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.activeCategory = btn.dataset.category;
          this.renderAssets();
        }
      });
    }

    if (this.viewGridBtn && this.viewListBtn) {
      this.viewGridBtn.addEventListener('click', () => {
        this.viewMode = 'grid';
        this.viewGridBtn.classList.add('active');
        this.viewListBtn.classList.remove('active');
        this.renderAssets();
      });

      this.viewListBtn.addEventListener('click', () => {
        this.viewMode = 'list';
        this.viewListBtn.classList.add('active');
        this.viewGridBtn.classList.remove('active');
        this.renderAssets();
      });
    }
  }

  async fetchSpotPrice(symbol) {
    try {
      const url = `https://api.coinbase.com/v2/prices/${symbol}-USD/spot`;
      const res = await fetch(url);
      const json = await res.json();
      if (json && json.data && json.data.amount) {
        return parseFloat(json.data.amount);
      }
    } catch (err) {
      console.warn(`Error fetching spot price for ${symbol}:`, err);
    }
    return null;
  }

  async fetchInitialPrices() {
    const promises = ALL_COIN_SYMBOLS.map(async (sym) => {
      const price = await this.fetchSpotPrice(sym);
      if (price !== null) {
        this.initialPrices[sym] = price;
        const history = [];
        for (let i = 0; i < 9; i++) {
          const varPct = (Math.random() - 0.49) * 0.008;
          history.push(price * (1 + varPct));
        }
        history.push(price);
        this.priceHistory[sym] = history;
      }
    });

    await Promise.all(promises);
    this.renderAssets();
  }

  startRealtimePolling() {
    setInterval(async () => {
      await this.updateAllPrices();
      this.updateTimerDisplay();
    }, 7000);
  }

  async updateAllPrices() {
    const promises = ALL_COIN_SYMBOLS.map(async (sym) => {
      const newPrice = await this.fetchSpotPrice(sym);
      if (newPrice !== null) {
        const history = this.priceHistory[sym] || [];
        const oldPrice = history.length ? history[history.length - 1] : newPrice;
        
        history.push(newPrice);
        if (history.length > 25) history.shift();
        this.priceHistory[sym] = history;

        this.updateCardDOM(sym, newPrice, oldPrice);
      }
    });

    await Promise.all(promises);
  }

  updateTimerDisplay() {
    const elapsedSec = Math.floor((Date.now() - this.sessionStartTime) / 1000);
    let text = `${elapsedSec} sec`;
    if (elapsedSec >= 60) {
      const m = Math.floor(elapsedSec / 60);
      const s = elapsedSec % 60;
      text = `${m}m ${s}s`;
    }
    if (this.roiDurationEl) {
      this.roiDurationEl.textContent = `ROI Tracked (${text})`;
    }
  }

  calculateROI(sym, currentPrice) {
    const basePrice = this.initialPrices[sym] || currentPrice;
    if (!basePrice || basePrice === 0) return 0;
    return ((currentPrice - basePrice) / basePrice) * 100;
  }

  formatPrice(price) {
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getFilteredSymbols() {
    return ALL_COIN_SYMBOLS.filter(sym => {
      const meta = getAssetMeta(sym);
      const matchesCategory = this.activeCategory === 'all' || meta.category === this.activeCategory;
      const matchesSearch = !this.searchQuery || 
        sym.toLowerCase().includes(this.searchQuery) || 
        meta.name.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });
  }

  renderAssets() {
    const symbols = this.getFilteredSymbols();
    if (!this.gridContainer) return;

    if (symbols.length === 0) {
      this.gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
          <h3>No assets found matching "${this.searchQuery}"</h3>
        </div>
      `;
      return;
    }

    if (this.viewMode === 'grid') {
      this.gridContainer.className = 'assets-grid';
      this.gridContainer.innerHTML = symbols.map(sym => this.buildCardHTML(sym)).join('');
    } else {
      this.gridContainer.className = 'assets-list-container';
      const rowsHTML = symbols.map((sym, idx) => this.buildListRowHTML(sym, idx + 1)).join('');
      
      this.gridContainer.innerHTML = `
        <div class="list-table-header">
          <span>#</span>
          <span>Asset</span>
          <span>Price</span>
          <span>24h Session ROI</span>
          <span>Price Trend (Live)</span>
          <span style="text-align: right;">Action</span>
        </div>
        <div class="assets-list">
          ${rowsHTML}
        </div>
      `;
    }

    // Direct page navigation on click
    symbols.forEach(sym => {
      const el = document.getElementById(`asset-${sym}`);
      if (el) {
        el.addEventListener('click', (e) => {
          window.location.href = `detail.html?asset=${sym}`;
        });
      }
    });
  }

  buildCardHTML(sym) {
    const meta = getAssetMeta(sym);
    const history = this.priceHistory[sym] || [100, 100];
    const currentPrice = history[history.length - 1] || 0;
    const roi = this.calculateROI(sym, currentPrice);
    const sparklineSVG = ChartEngine.generateSparklineSVG(history, 100, 32);

    return `
      <div class="asset-card" id="asset-${sym}" title="Click to view full detail & AI forecast for ${sym}">
        <div class="asset-card-top">
          <div class="asset-info">
            <img class="asset-logo" src="./black/${meta.icon}" alt="${sym}" onerror="this.src='./favicon-32x32.png'" />
            <div>
              <div class="asset-symbol">${sym}</div>
              <div class="asset-name">${meta.name}</div>
            </div>
          </div>
          <span class="roi-badge ${roi >= 0 ? 'positive' : 'negative'}">
            ${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%
          </span>
        </div>
        <div class="asset-card-bottom">
          <div>
            <div class="price-display" id="price-${sym}">${this.formatPrice(currentPrice)}</div>
            <span class="asset-tag-pill">${meta.tag}</span>
          </div>
          <div class="sparkline-wrapper" id="spark-${sym}">
            ${sparklineSVG}
          </div>
        </div>
      </div>
    `;
  }

  buildListRowHTML(sym, index) {
    const meta = getAssetMeta(sym);
    const history = this.priceHistory[sym] || [100, 100];
    const currentPrice = history[history.length - 1] || 0;
    const roi = this.calculateROI(sym, currentPrice);
    const sparklineSVG = ChartEngine.generateSparklineSVG(history, 110, 28);

    return `
      <div class="asset-list-row" id="asset-${sym}">
        <span class="row-rank">${index}</span>
        <div class="asset-info">
          <img class="asset-logo" src="./black/${meta.icon}" alt="${sym}" onerror="this.src='./favicon-32x32.png'" />
          <div>
            <span class="asset-symbol">${sym}</span>
            <span class="asset-name" style="margin-left: 6px;">${meta.name}</span>
          </div>
        </div>
        <div class="price-display" id="price-${sym}">${this.formatPrice(currentPrice)}</div>
        <div>
          <span class="roi-badge ${roi >= 0 ? 'positive' : 'negative'}">
            ${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%
          </span>
        </div>
        <div class="sparkline-wrapper" id="spark-${sym}">
          ${sparklineSVG}
        </div>
        <div style="text-align: right;">
          <a href="detail.html?asset=${sym}" class="btn-detail-link">Detail & AI →</a>
        </div>
      </div>
    `;
  }

  updateCardDOM(sym, newPrice, oldPrice) {
    const priceEl = document.getElementById(`price-${sym}`);
    const sparkEl = document.getElementById(`spark-${sym}`);

    if (priceEl) {
      priceEl.textContent = this.formatPrice(newPrice);
      if (newPrice > oldPrice) {
        priceEl.classList.remove('flash-down');
        priceEl.classList.add('flash-up');
      } else if (newPrice < oldPrice) {
        priceEl.classList.remove('flash-up');
        priceEl.classList.add('flash-down');
      }
      setTimeout(() => {
        priceEl.classList.remove('flash-up', 'flash-down');
      }, 800);
    }

    if (sparkEl) {
      const history = this.priceHistory[sym] || [];
      sparkEl.innerHTML = ChartEngine.generateSparklineSVG(history, 100, 32);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new BchangeApp();
});
