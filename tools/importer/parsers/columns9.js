/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns within the container
  const row = element.querySelector('.container > .row');
  if (!row) return;

  const cols = Array.from(row.children);
  // Extract the main content from each column
  const colCells = cols.map(col => {
    let box = col.querySelector('.boxzoom, .bg-white');
    return box ? box : document.createElement('span');
  });

  // Compose the block table with a single-cell header row
  const rows = [
    ['Columns (columns9)'], // Header: Only ONE cell regardless of number of columns
    colCells // Each element in colCells will become a cell in the second row
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
