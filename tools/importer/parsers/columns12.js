/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, matching the example
  const headerRow = ['Columns (columns12)'];

  // The next row should have as many columns as there are columns in the HTML
  // Each col is one column (usually a .col-lg-4)
  const cols = element.querySelectorAll(':scope > div');

  // Helper: collect all content from a column, converting iframes to links
  function getColumnContent(col) {
    const parts = [];
    col.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IFRAME') {
          const a = document.createElement('a');
          a.href = node.src;
          a.textContent = node.src;
          parts.push(a);
        } else {
          parts.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        parts.push(document.createTextNode(node.textContent));
      }
    });
    return parts.length === 1 ? parts[0] : parts;
  }

  // Build the content row with one cell per column
  const contentRow = Array.from(cols).map(getColumnContent);

  // The block table: first row = single header cell, second row = multiple columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
