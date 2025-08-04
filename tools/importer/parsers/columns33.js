/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all visible content (elements and text nodes) except modals
  function getVisibleContent(container) {
    const nodes = [];
    container.childNodes.forEach(node => {
      if (node.nodeType === 1 && node.classList.contains('modal')) return;
      if (node.nodeType === 3) {
        // Text node: keep if not whitespace only
        if (node.textContent && node.textContent.trim().length > 0) {
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          nodes.push(span);
        }
      } else {
        nodes.push(node);
      }
    });
    return nodes;
  }

  // Find the two main columns
  const cols = element.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // LEFT COLUMN: all visible content
  const leftCol = cols[0];
  const leftContent = getVisibleContent(leftCol);

  // RIGHT COLUMN: layout is a 2x2 grid of videos/thumbnails
  const rightCol = cols[1];
  let rightContentItems = [];
  const gridRows = rightCol.querySelectorAll(':scope > .row > .col-lg-6');
  if (gridRows.length > 0) {
    gridRows.forEach(cell => {
      const cellContent = getVisibleContent(cell);
      if (cellContent.length > 0) {
        // Wrap each cell content for grid representation
        const wrapper = document.createElement('div');
        cellContent.forEach(item => wrapper.appendChild(item));
        rightContentItems.push(wrapper);
      }
    });
  } else {
    // fallback: all visible children
    rightContentItems = getVisibleContent(rightCol);
  }
  // Place all grid cells into a container for 2x2 appearance
  const rightGrid = document.createElement('div');
  rightGrid.style.display = 'grid';
  rightGrid.style.gridTemplateColumns = '1fr 1fr';
  rightGrid.style.gap = '1em';
  rightContentItems.forEach(el => rightGrid.appendChild(el));

  // Compose the table as per the Columns (columns33) block
  const cells = [
    ['Columns (columns33)'],
    [leftContent, rightGrid]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
