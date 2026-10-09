// Ultra-Fast Lightweight Sparkline & Price Chart Engine for Bchange Lite v2

const ChartEngine = {
  /**
   * Generates a lightweight inline SVG sparkline string
   */
  generateSparklineSVG(prices, width = 110, height = 32) {
    if (!prices || prices.length < 2) {
      return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="sparkline-svg">
        <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" stroke="#4B5563" stroke-width="1.5" stroke-dasharray="3,3" />
      </svg>`;
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = (max - min) || (min * 0.001) || 1;
    const paddingY = 4;
    const usableHeight = height - (paddingY * 2);

    const points = prices.map((price, idx) => {
      const x = (idx / (prices.length - 1)) * width;
      const y = height - paddingY - ((price - min) / range) * usableHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const isPositive = prices[prices.length - 1] >= prices[0];
    const strokeColor = isPositive ? '#10B981' : '#EF4444';
    const gradientId = `spark-${Math.random().toString(36).substring(2, 7)}`;

    const firstX = 0;
    const lastX = width;
    const areaPath = `M ${points[0]} L ${points.join(' L ')} L ${lastX},${height} L ${firstX},${height} Z`;
    const linePath = `M ${points.join(' L ')}`;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="sparkline-svg" style="display: block; overflow: hidden;">
        <defs>
          <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.3" />
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#${gradientId})" />
        <path d="${linePath}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  },

  /**
   * Render an interactive high-resolution canvas chart in detail view with strict clipping
   */
  renderDetailChart(canvas, prices, timestamps = []) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width <= 0 || height <= 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.save();

    // Background clear
    ctx.clearRect(0, 0, width, height);

    // Strict clipping region inside canvas box
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.clip();

    if (!prices || prices.length === 0) {
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '600 14px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Accumulating real-time price history data...', width / 2, height / 2);
      ctx.restore();
      return;
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = (max - min) || (min * 0.005) || 1;

    const topPadding = 30;
    const bottomPadding = 35;
    const leftPadding = 15;
    const rightPadding = 65; // Leave space for Y-axis price labels

    const chartWidth = width - leftPadding - rightPadding;
    const chartHeight = height - topPadding - bottomPadding;

    const isPositive = prices.length < 2 || prices[prices.length - 1] >= prices[0];
    const lineColor = isPositive ? '#10B981' : '#EF4444';

    // Draw horizontal grid lines & price axis labels
    ctx.strokeStyle = '#37415144';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '600 12px Quicksand, sans-serif';

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = topPadding + (i / gridLines) * chartHeight;
      const priceVal = max - (i / gridLines) * range;

      ctx.beginPath();
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(width - rightPadding, y);
      ctx.stroke();

      ctx.textAlign = 'left';
      const labelText = priceVal < 1 
        ? `$${priceVal.toFixed(4)}` 
        : `$${priceVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      ctx.fillText(labelText, width - rightPadding + 10, y + 4);
    }

    // Coordinates math strictly within padded canvas bounds
    const coords = prices.map((p, idx) => {
      const x = leftPadding + (idx / Math.max(1, prices.length - 1)) * chartWidth;
      const y = topPadding + chartHeight - ((p - min) / range) * chartHeight;
      return { x, y, price: p };
    });

    // Draw area gradient under line
    const areaGrad = ctx.createLinearGradient(0, topPadding, 0, height - bottomPadding);
    areaGrad.addColorStop(0, isPositive ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)');
    areaGrad.addColorStop(1, isPositive ? 'rgba(16, 185, 129, 0.0)' : 'rgba(239, 68, 68, 0.0)');

    ctx.beginPath();
    ctx.moveTo(coords[0].x, height - bottomPadding);
    coords.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(coords[coords.length - 1].x, height - bottomPadding);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();

    // Draw main chart line
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw pulsing current price dot on last point
    const lastPt = coords[coords.length - 1];
    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
};
