/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row, exactly as required
  const headerRow = ['Columns (columns56)'];

  // Find the columns inside the section
  const row = element.querySelector('.row');
  let columnDivs = [];
  if (row) {
    // Only consider direct div children of row
    columnDivs = Array.from(row.children).filter((el) => el.tagName === 'DIV');
  }

  // For each column, grab the entire div (to ensure all content is included)
  const columns = columnDivs.map((col) => col);

  // Build the cells array as required: header row is a single cell, then one row with all columns as cells
  const cells = [
    headerRow,
    columns
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
