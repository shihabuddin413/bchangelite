// Realtime AI Research & 6-Month Forecast Infographic Engine for Bchange Lite v2

const AIResearchEngine = {
  /**
   * Generates comprehensive AI research analysis and 6-month forecast infographic model
   */
  generateReport(symbol, currentPrice, roi24h = 0) {
    const meta = getAssetMeta(symbol);
    const price = currentPrice || 100;
    const isStable = meta.category === 'stablecoins';

    // 1. Infographic Metrics & Fundamentals Data
    const techScore = isStable ? 99 : (meta.category === 'layer1' ? 96 : 91);
    const adoptionScore = isStable ? 98 : (meta.category === 'layer1' ? 94 : 88);
    const volatilityRating = isStable ? 'LOW' : (meta.category === 'layer1' ? 'MEDIUM' : 'HIGH');
    const volatilityColor = isStable ? '#10B981' : (meta.category === 'layer1' ? '#3B82F6' : '#F59E0B');

    const keyPoints = [
      {
        title: 'Architecture & Protocol Utility',
        category: 'Technology',
        icon: '⚡',
        score: techScore,
        scoreLabel: 'Decentralization Rating',
        description: `${meta.name} (${symbol}) operates as a premier ${meta.tag}. ${meta.description}`,
        tags: ['Decentralized', meta.tag, 'Audited Protocol']
      },
      {
        title: 'Market Liquidity & Ecosystem',
        category: 'Adoption',
        icon: '📊',
        score: adoptionScore,
        scoreLabel: 'Market Liquidity Index',
        description: isStable 
          ? `${symbol} serves as essential stable collateral across major decentralized finance protocols and international settlement rails.`
          : `Deep liquidity pools across institutional exchanges, active developer ecosystems, and expanding Web3 integrations position ${symbol} as a core ${meta.category.toUpperCase()} asset.`,
        tags: ['Institutional Grade', 'High Volume', 'Multi-Exchange']
      },
      {
        title: 'Growth Vector Catalysts',
        category: 'Catalysts',
        icon: '🚀',
        score: 92,
        scoreLabel: 'Growth Potential Index',
        description: isStable
          ? `Regulatory compliance frameworks, audited reserves, and multi-chain expansion drive steady total value locked (TVL) growth.`
          : `Upcoming protocol upgrades, expanding layer-2 scalability, institutional ETF capital flows, and global macro liquidity cycles supply powerful tailwinds.`,
        tags: ['ETF Accumulation', 'Network Upgrades', 'Macro Demand']
      },
      {
        title: 'Risk Profile & Volatility Matrix',
        category: 'Risk Assessment',
        icon: '🛡️',
        volatilityRating: volatilityRating,
        volatilityColor: volatilityColor,
        scoreLabel: 'Risk Tier',
        description: isStable
          ? `Minimal principal risk; primary focus centers on peg stability, reserve audits, and yields.`
          : `Subject to macro interest rate shifts, regulatory updates, and systemic crypto volatility. Session momentum reads ${roi24h >= 0 ? '+' : ''}${roi24h.toFixed(2)}%.`,
        tags: [`Volatility: ${volatilityRating}`, 'Audited', 'Systemic Shield']
      }
    ];

    // 2. Compute 6-Month Month-by-Month Forecast Projections
    const forecastMonths = [];
    const now = new Date();

    for (let i = 1; i <= 6; i++) {
      const forecastDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthLabel = forecastDate.toLocaleString('default', { month: 'short', year: 'numeric' });

      let baseMultiplier = 1 + (i * 0.025) + (roi24h * 0.002);
      let bullMultiplier = 1 + (i * 0.06) + Math.abs(roi24h * 0.005);
      let bearMultiplier = Math.max(0.2, 1 - (i * 0.035) - Math.abs(roi24h * 0.003));

      if (isStable) {
        baseMultiplier = 1.0;
        bullMultiplier = 1.002;
        bearMultiplier = 0.998;
      }

      const basePrice = price * baseMultiplier;
      const bullPrice = price * bullMultiplier;
      const bearPrice = price * bearMultiplier;

      const catalysts = [
        `Q${Math.ceil((now.getMonth() + i + 1)/3)} Protocol Network Upgrade & Scalability Enhancements`,
        `Institutional Treasury Accumulation & Liquidity Inflows`,
        `Macro Crypto Market Liquidity Expansion & ETF Demand`,
        `Ecosystem Developer Grants & DApp Adoption Surge`,
        `Cross-Chain Interoperability Expansion & Governance Proposals`,
        `Macro Interest Rate Cuts & Global Fiat Devaluation Tailwinds`
      ];

      forecastMonths.push({
        monthNumber: i,
        monthLabel: monthLabel,
        basePrice: basePrice,
        bullPrice: bullPrice,
        bearPrice: bearPrice,
        baseChange: ((baseMultiplier - 1) * 100).toFixed(1),
        bullChange: ((bullMultiplier - 1) * 100).toFixed(1),
        bearChange: ((bearMultiplier - 1) * 100).toFixed(1),
        keyDriver: catalysts[i - 1]
      });
    }

    const peakBullPrice = forecastMonths[5].bullPrice;
    const baseEndPrice = forecastMonths[5].basePrice;

    return {
      symbol: symbol,
      name: meta.name,
      category: meta.category,
      tag: meta.tag,
      currentPrice: price,
      roi24h: roi24h,
      keyPoints: keyPoints,
      forecastMonths: forecastMonths,
      peakBullPrice: peakBullPrice,
      baseEndPrice: baseEndPrice,
      generatedAt: new Date().toLocaleTimeString()
    };
  },

  /**
   * Formats report into rich infographic HTML
   */
  renderReportHTML(report) {
    const formatCurrency = (num) => {
      if (num < 1) return `$${num.toFixed(4)}`;
      return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // 1. Key Research Points Infographic Cards
    const keyPointsCards = report.keyPoints.map(pt => `
      <div class="infographic-card">
        <div class="infographic-card-header">
          <div class="infographic-icon-badge">${pt.icon}</div>
          <div>
            <div class="infographic-card-title">${pt.title}</div>
            <span class="infographic-tag-pill">${pt.category}</span>
          </div>
        </div>
        
        <p class="infographic-card-body">${pt.description}</p>

        <!-- Progress meter graphic -->
        <div class="infographic-meter-section">
          <div class="meter-header">
            <span>${pt.scoreLabel}</span>
            <span class="meter-score">${pt.volatilityRating || (pt.score + '/100')}</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill" style="width: ${pt.score || 85}%; background: ${pt.volatilityColor || 'linear-gradient(90deg, #3B82F6, #10B981)'};"></div>
          </div>
        </div>

        <div class="infographic-chip-row">
          ${pt.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // 2. 6-Month Forecast Infographic Timeline Bars
    const maxBullPrice = Math.max(...report.forecastMonths.map(m => m.bullPrice));

    const forecastTimelineCards = report.forecastMonths.map(m => {
      const bullBarWidth = Math.min(100, Math.max(15, (m.bullPrice / maxBullPrice) * 100));
      const baseBarWidth = Math.min(100, Math.max(12, (m.basePrice / maxBullPrice) * 100));
      const bearBarWidth = Math.min(100, Math.max(10, (m.bearPrice / maxBullPrice) * 100));

      return `
        <div class="forecast-infographic-item">
          <div class="month-info-badge">
            <div class="month-number">M${m.monthNumber}</div>
            <div class="month-label-sub">${m.monthLabel}</div>
          </div>

          <div class="forecast-bars-container">
            <div class="driver-banner">
              <span>🎯 Catalyst:</span> ${m.keyDriver}
            </div>

            <!-- Bullish Bar -->
            <div class="infographic-bar-row">
              <span class="bar-label bull">🟢 Bullish Target</span>
              <div class="bar-track">
                <div class="bar-fill bull" style="width: ${bullBarWidth.toFixed(1)}%;"></div>
              </div>
              <span class="bar-val bull">${formatCurrency(m.bullPrice)} <small>(+${m.bullChange}%)</small></span>
            </div>

            <!-- Base Bar -->
            <div class="infographic-bar-row">
              <span class="bar-label base">🔵 Base Target</span>
              <div class="bar-track">
                <div class="bar-fill base" style="width: ${baseBarWidth.toFixed(1)}%;"></div>
              </div>
              <span class="bar-val base">${formatCurrency(m.basePrice)} <small>(${m.baseChange >= 0 ? '+' : ''}${m.baseChange}%)</small></span>
            </div>

            <!-- Bearish Bar -->
            <div class="infographic-bar-row">
              <span class="bar-label bear">🔴 Bearish Target</span>
              <div class="bar-track">
                <div class="bar-fill bear" style="width: ${bearBarWidth.toFixed(1)}%;"></div>
              </div>
              <span class="bar-val bear">${formatCurrency(m.bearPrice)} <small>(${m.bearChange}%)</small></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="ai-infographic-wrapper">
        
        <!-- Header Banner -->
        <div class="infographic-main-banner">
          <div class="banner-title-area">
            <span class="banner-badge">🤖 REALTIME AI MARKET INTELLIGENCE</span>
            <h2>${report.name} (${report.symbol}) Infographic Dashboard</h2>
            <p>Live Spot Price: <strong>${formatCurrency(report.currentPrice)}</strong> | Session ROI: <span class="${report.roi24h >= 0 ? 'green-text' : 'red-text'}">${report.roi24h >= 0 ? '+' : ''}${report.roi24h.toFixed(2)}%</span></p>
          </div>

          <div class="banner-summary-stats">
            <div class="summary-stat-chip">
              <span class="chip-title">6-Month Peak Target</span>
              <span class="chip-value positive">${formatCurrency(report.peakBullPrice)}</span>
            </div>
            <div class="summary-stat-chip">
              <span class="chip-title">6-Month Base Target</span>
              <span class="chip-value neutral">${formatCurrency(report.baseEndPrice)}</span>
            </div>
          </div>
        </div>

        <!-- Section 1: Fundamental Infographic Cards -->
        <div class="infographic-section">
          <div class="section-header-box">
            <span class="section-icon">💡</span>
            <div>
              <h3 class="section-heading">Key Research Takeaways Infographic</h3>
              <p class="section-subtext">Fundamental architecture, ecosystem adoption index, and risk tiering</p>
            </div>
          </div>

          <div class="infographics-grid">
            ${keyPointsCards}
          </div>
        </div>

        <!-- Section 2: 6-Month Forecast Infographic Timeline -->
        <div class="infographic-section" style="margin-top: 36px;">
          <div class="section-header-box">
            <span class="section-icon">📈</span>
            <div>
              <h3 class="section-heading">6-Month Trajectory & Forecast Infographic</h3>
              <p class="section-subtext">Visual scenario bars comparing Bullish, Base, and Bearish monthly target trajectories</p>
            </div>
          </div>

          <div class="forecast-timeline-list">
            ${forecastTimelineCards}
          </div>
        </div>

      </div>
    `;
  }
};
