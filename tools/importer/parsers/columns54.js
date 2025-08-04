/* global WebImporter */
export default function parse(element, { document }) {
  // Header row is always a single column
  const headerRow = ['Columns (columns54)'];

  // Find the columns in the source HTML
  const row = element.querySelector('.container > .row');
  let columns = [];

  if (row) {
    // Each .col-lg-6 is a column
    const colDivs = Array.from(row.children).filter(div => div.classList.contains('col-lg-6'));
    columns = colDivs.map(col => {
      // Use all *direct* children of col, ignoring empty text nodes
      const children = Array.from(col.childNodes).filter(node => node.nodeType !== 3 || node.textContent.trim().length > 0);
      if (children.length === 1) {
        return children[0];
      }
      const fragment = document.createDocumentFragment();
      children.forEach(child => fragment.appendChild(child));
      return fragment;
    });
  }

  // Fallback: if no columns found, put the whole element in one cell
  if (columns.length === 0) {
    const fragment = document.createDocumentFragment();
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType !== 3 || node.textContent.trim().length > 0) {
        fragment.appendChild(node);
      }
    });
    columns = [fragment];
  }

  // Build the table: header row (single column), then columns row (N columns)
  const tableRows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
