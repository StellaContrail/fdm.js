class SimplePlot {
  _canvas = null;
  _context = null;

  constructor(canvas) {
    this._canvas = document.getElementById(canvas);
    this._context = this._canvas.getContext("2d");
    const width = this._canvas.clientWidth * 1.5;
    const height = this._canvas.clientHeight * 1.5;
    this._canvas.setAttribute("width", width);
    this._canvas.setAttribute("height", height);
    this._context.lineWidth = 3;
  }

  draw(plots, a, b) {
    const canvas = this._canvas;
    const context = this._context;
    context.textBaseline = "middle";
    context.font = "17pt math";

    let plot_count = 0;
    plots.forEach(plot => {
      const func = plot.func;
      const lineColor = plot.color || 'black';
      const lineStyle = plot.style || [];
      const legend = plot.legend;
      context.setLineDash(lineStyle);

      // graph
      context.beginPath();
      context.strokeStyle = lineColor;
      for (i = 0; i < a.length; i++) {
        let x = a[i];
        const xmin = a[0]; const xmax = a[a.length - 1];
        const ymin = b[0]; const ymax = b[b.length - 1];
        context.lineTo((x - xmin) / (xmax - xmin) * canvas.width, canvas.height * (1 - (func(x) - ymin) / (ymax - ymin)));
      }
      context.stroke();

      // legend
      context.beginPath();
      let x0 = 0; let y0 = canvas.height - 30 * (plots.length - plot_count); const legendWidth = 35;
      context.moveTo(x0, y0);
      context.lineTo(x0 + legendWidth, y0);
      context.fillText(legend, x0 + legendWidth + 5, y0);
      context.stroke();

      plot_count++;
    })
  }
}