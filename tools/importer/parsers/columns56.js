/* global WebImporter */
export default function parse(element, { document }) {
  // The header must be a single cell
  const headerRow = ['Columns (columns56)'];

  // Extract the columns
  let columnCells = [];
  const container = element.querySelector('.container');
  if (container) {
    const row = container.querySelector('.row');
    if (row) {
      // Only direct children are columns
      const cols = Array.from(row.children);
      // Only use the first two columns as per expected layout
      columnCells = cols.slice(0, 2);
    }
  }
  // Fallback: if not found, fill with empty divs
  while (columnCells.length < 2) {
    columnCells.push(document.createElement('div'));
  }

  // Compose the table
  const tableRows = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
