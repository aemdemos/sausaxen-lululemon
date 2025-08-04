/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have one cell but should visually span two columns. The block table creation code
  // will automatically render the header <th> with colspan when following the pattern: first row = 1 cell, subsequent rows = 2 cells.
  const cells = [['Cards (cards26)']];

  // Cards (each bar row)
  const barsList = element.querySelector('#bars');
  if (barsList) {
    const barLis = barsList.querySelectorAll('li');
    barLis.forEach((li) => {
      // First column: bar SVG visual
      const barDiv = li.querySelector('.bar');
      let barSvg = '';
      if (barDiv && barDiv.hasAttribute('data-percentage')) {
        const pct = barDiv.getAttribute('data-percentage');
        const svgWidth = 80;
        const svgHeight = 18;
        barSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        barSvg.setAttribute('width', svgWidth);
        barSvg.setAttribute('height', svgHeight);
        barSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
        // background
        const rectBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectBg.setAttribute('x', 0);
        rectBg.setAttribute('y', 4);
        rectBg.setAttribute('width', svgWidth);
        rectBg.setAttribute('height', 10);
        rectBg.setAttribute('fill', '#f0f0f0');
        barSvg.appendChild(rectBg);
        // bar
        const rectFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectFill.setAttribute('x', 0);
        rectFill.setAttribute('y', 4);
        rectFill.setAttribute('width', Math.round(svgWidth * parseInt(pct, 10) / 100));
        rectFill.setAttribute('height', 10);
        rectFill.setAttribute('fill', '#1a73e8');
        barSvg.appendChild(rectFill);
        // percentage text (from .bar em)
        const em = barDiv.querySelector('em');
        if (em && em.textContent.trim()) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', svgWidth - 4);
          text.setAttribute('y', 13);
          text.setAttribute('text-anchor', 'end');
          text.setAttribute('font-size', '11');
          text.setAttribute('fill', '#111');
          text.textContent = em.textContent.trim();
          barSvg.appendChild(text);
        }
      }
      // Second column: label as <strong>
      const labelSpan = li.querySelector('span');
      let labelContent = '';
      if (labelSpan && labelSpan.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = labelSpan.textContent.trim();
        labelContent = strong;
      }
      cells.push([barSvg || '', labelContent]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
