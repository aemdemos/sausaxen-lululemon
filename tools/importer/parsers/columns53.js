/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match the block name exactly as specified
  const headerRow = ['Columns (columns53)'];

  // Find the container and row for columns
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;

  // Get all column divs (direct children - for robustness)
  const columns = Array.from(row.children).filter(col => col.classList.contains('col-lg-3'));

  // For each column, use the first child div (the white box), or fallback to the column itself
  const cells = columns.map(col => {
    // get the direct <div> child (the box), not any deeper descendants
    const box = Array.from(col.children).find(child => child.tagName === 'DIV');
    return box || col;
  });

  // Structure: header row, then a single row with a cell for each column
  const tableData = [headerRow, cells];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
