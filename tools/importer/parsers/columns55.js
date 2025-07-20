/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row that contains the columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get all direct child column divs
  const columns = Array.from(row.children);
  // Prepare the cells for the block table
  // Header row should be a single cell, regardless of number of columns
  const headerRow = ['Columns (columns55)'];
  // Content row: one cell for each column's content
  const contentRow = columns.map(col => {
    // Get all non-empty children (elements, or text nodes with content)
    const nodes = Array.from(col.childNodes).filter(
      n => n.nodeType !== 3 || n.textContent.trim() !== ''
    );
    return nodes.length === 1 ? nodes[0] : nodes;
  });
  // The block table: header row (1 cell), then content row (n cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
