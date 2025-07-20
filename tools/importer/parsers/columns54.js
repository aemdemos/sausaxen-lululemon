/* global WebImporter */
export default function parse(element, { document }) {
  // Get the container and row that contain the columns
  const container = element.querySelector(':scope > div.container');
  if (!container) return;
  const row = container.querySelector(':scope > div.row');
  if (!row) return;
  const cols = Array.from(row.children);

  // Extract all valid content from each column
  const contentCells = cols.map(col => {
    // Filter out empty text nodes
    const nodes = Array.from(col.childNodes).filter(n => 
      n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '')
    );
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    return '';
  });

  // Create the table: first row is single header cell
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns54)'],
    contentCells
  ], document);

  element.replaceWith(table);
}
