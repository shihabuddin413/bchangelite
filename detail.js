// Dedicated Asset Detail Page Controller for Bchange Lite v2

class DetailPageController {
  constructor() {
    this.symbol = this.getSymbolFromURL() || 'BTC';
    this.meta = getAssetMeta(this.symbol);
    this.prices = [];
    this.initialPrice = null;
    this.sessionStartTime = Date.now();
    this.pollingInterval = null;

    this.init();
  }

  getSymbolFromURL() {
    const params = new URLSearchParams(window.location.search);
    return (params.get('asset') || params.get('symbol') || 'BTC').toUpperCase();
  }

  async init() {
    this.setupDOM();
    this.renderHeaderInfo();
    await this.fetchPriceHistory();
    this.renderChartAndStats();
    this.renderAIResearch();
    this.startRealtimePolling();
  }

  setupDOM() {
    this.logoEl = document.getElementById('detailLogo');
    this.symbolEl = document.getElementById('detailSymbol');
    this.categoryBadgeEl = document.getElementById('detailCategoryBadge');
    this.descEl = document.getElementById('detailDescription');
    this.priceEl = document.getElementById('detailPrice');
    this.roiEl = document.getElementById('detailROI');
    this.canvasEl = document.getElementById('detailChartCanvas');
    this.statCategoryEl = document.getElementById('statCategory');
    this.statInitialEl = document.getElementById('statInitial');
    this.statLowEl = document.getElementById('statLow');
    this.statHighEl = document.getElementById('statHigh');
    this.aiContainer = document.getElementById('aiResearchContainer');
    this.roiDurationEl = document.getElementById('roiDuration');
  }

  renderHeaderInfo() {
    document.title = `${this.symbol} (${this.meta.name}) - Bchange Lite`;
    if (this.symbolEl) this.symbolEl.textContent = `${this.meta.name} (${this.symbol})`;
    if (this.logoEl) {
      this.logoEl.src = `./black/${this.meta.icon}`;
      this.logoEl.onerror = () => { this.logoEl.src = './favicon-32x32.png'; };
    }
    if (this.categoryBadgeEl) this.categoryBadgeEl.textContent = this.meta.category.toUpperCase();
    if (this.descEl) this.descEl.textContent = this.meta.description;
    if (this.statCategoryEl) this.statCategoryEl.textContent = this.meta.category.toUpperCase();
  }

  async fetchSpotPrice() {
    try {
      const url = `https://api.coinbase.com/v2/prices/${this.symbol}-USD/spot`;
      const res = await fetch(url);
      const json = await res.json();
      if (json && json.data && json.data.amount) {
        return parseFloat(json.data.amount);
      }
    } catch (err) {
      console.warn(`Error fetching spot price for ${this.symbol}:`, err);
    }
    return null;
  }

  async fetchPriceHistory() {
    const spot = await this.fetchSpotPrice();
    const current = spot !== null ? spot : 100;
    this.initialPrice = current;

    // Build initial 12-point smooth price curve
    this.prices = [];
    for (let i = 0; i < 11; i++) {
      const varPct = (Math.random() - 0.49) * 0.008;
      this.prices.push(current * (1 + varPct));
    }
    this.prices.push(current);
  }

  formatPrice(val) {
    if (val < 1) return `$${val.toFixed(4)}`;
    return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  calculateROI(current) {
    if (!this.initialPrice) return 0;
    return ((current - this.initialPrice) / this.initialPrice) * 100;
  }

  renderChartAndStats() {
    if (!this.prices.length) return;
    const current = this.prices[this.prices.length - 1];
    const roi = this.calculateROI(current);
    const min = Math.min(...this.prices);
    const max = Math.max(...this.prices);

    if (this.priceEl) this.priceEl.textContent = this.formatPrice(current);
    if (this.roiEl) {
      this.roiEl.className = `roi-badge ${roi >= 0 ? 'positive' : 'negative'}`;
      this.roiEl.textContent = `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`;
    }

    if (this.statInitialEl) this.statInitialEl.textContent = this.formatPrice(this.initialPrice);
    if (this.statLowEl) this.statLowEl.textContent = this.formatPrice(min);
    if (this.statHighEl) this.statHighEl.textContent = this.formatPrice(max);

    // Render Canvas Chart
    ChartEngine.renderDetailChart(this.canvasEl, this.prices);
  }

  renderAIResearch() {
    if (!this.aiContainer) return;
    const current = this.prices.length ? this.prices[this.prices.length - 1] : 100;
    const roi = this.calculateROI(current);
    const report = AIResearchEngine.generateReport(this.symbol, current, roi);
    this.aiContainer.innerHTML = AIResearchEngine.renderReportHTML(report);
  }

  startRealtimePolling() {
    this.pollingInterval = setInterval(async () => {
      const newPrice = await this.fetchSpotPrice();
      if (newPrice !== null) {
        this.prices.push(newPrice);
        if (this.prices.length > 30) this.prices.shift();
        this.renderChartAndStats();
      }

      // Update Session Duration Counter
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
    }, 6000);
  }
}

// Handle window resize for dynamic canvas chart responsiveness
window.addEventListener('resize', () => {
  if (window.detailController && window.detailController.canvasEl) {
    ChartEngine.renderDetailChart(window.detailController.canvasEl, window.detailController.prices);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  window.detailController = new DetailPageController();
});
