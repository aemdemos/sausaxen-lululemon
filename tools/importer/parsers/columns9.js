/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.container > .row');
  if (!row) return;

  // Get all immediate .col-lg-4 children (the columns)
  const colDivs = Array.from(row.children).filter(div => div.classList.contains('col-lg-4'));

  // For each column, extract the main content box
  const columns = colDivs.map(col => {
    const box = col.querySelector('.bg-white');
    return box || col;
  });

  // The header row must be a single cell (regardless of column count)
  const headerRow = ['Columns (columns9)'];

  // The second row is an array of N columns
  const tableRows = [headerRow, columns];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
