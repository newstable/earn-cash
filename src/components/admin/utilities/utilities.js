const textRefactor = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const chartLinearGradient = (canvas, height, color) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color.start}`);
  gradient.addColorStop(1, `${color.end}`);
  return gradient;
};

// Custom Tooltip
const customTooltips = function(context) {
  // Tooltip Element
  let tooltipEl = document.querySelector('.chartjs-tooltip');
  if (!this._chart.canvas.closest('.parentContainer').contains(tooltipEl)) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';

    document.querySelectorAll('.parentContainer').forEach(el => {
      if (el.contains(document.querySelector('.chartjs-tooltip'))) {
        document.querySelector('.chartjs-tooltip').remove();
      }
    });

    this._chart.canvas.closest('.parentContainer').appendChild(tooltipEl);
  }
  const tooltipModel = context.tooltip;
  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    const titleLines = tooltipModel.title || [];
    const bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = '<thead>';

    titleLines.forEach(function(title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function(body, i) {
      const colors = tooltipModel.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += '; border-width: 2px';
      style += '; border-radius: 30px';
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });

    innerHtml += '</tbody>';

    const tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }

  const positionY = this._chart.canvas.offsetTop;
  const positionX = this._chart.canvas.offsetLeft;
  const toolTip = document.querySelector('.chartjs-tooltip');
  const toolTipHeight = toolTip.clientHeight;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltipModel.caretX}px`;
  tooltipEl.style.top = `${positionY +
    tooltipModel.caretY -
    (tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.fontFamily = tooltipModel.options.bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltipModel.options.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltipModel.options.bodyFontStyle;
  tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
};

// Inline SVG
const inlineSvg = function(){
  document.querySelectorAll('img.svg').forEach(function (e) {
    var imgID = e.getAttribute('id');
    var imgClass = e.getAttribute('class');
    var imgURL = e.getAttribute('src');

    fetch(imgURL).then(function (response) {
        return response.text();
    }).then(function (data) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, 'text/xml');
        var svg = xmlDoc.getElementsByTagName('svg')[0];

        if (typeof imgID !== 'undefined') {
            svg.setAttribute('id', imgID);
        }

        if (typeof imgClass !== 'undefined') {
            svg.setAttribute('class', imgClass + ' replaced-svg');
        }

        svg.removeAttribute('xmlns:a');

        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
            svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'));
        }
        e.parentNode.replaceChild(svg, e);
    });
  });
}

export { textRefactor, chartLinearGradient, customTooltips, inlineSvg };
