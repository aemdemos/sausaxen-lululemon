/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be exactly one column, as per requirements
  const cells = [['Columns (columns30)']];

  // Find all immediate tab-pane children (each will represent a row of two columns)
  const tabPanes = element.querySelectorAll(':scope > .tab-pane');

  tabPanes.forEach(tabPane => {
    const row = tabPane.querySelector(':scope > .row');
    if (!row) return;
    const left = row.querySelector(':scope > .col-md-7');
    const right = row.querySelector(':scope > .col-md-5');
    let leftContent = [];
    let rightContent = [];
    // For left column, include all children (heading and list)
    if (left) {
      leftContent = Array.from(left.childNodes).filter(n => {
        // Keep elements or non-empty text nodes
        if (n.nodeType === 1) return true;
        if (n.nodeType === 3 && n.textContent.trim()) return true;
        return false;
      });
    }
    // For right column, only the first image
    if (right) {
      const img = right.querySelector('img');
      if (img) rightContent.push(img);
    }
    // Push row: two columns (array with length 2)
    cells.push([
      leftContent.length === 1 ? leftContent[0] : leftContent,
      rightContent.length === 1 ? rightContent[0] : rightContent
    ]);
  });

  // If there are no tab-pane children, treat the entire element as a single cell after the header
  if (cells.length === 1) {
    cells.push([element]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
