/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Columns (columns7)'];

  // Extract the heading
  const heading = element.querySelector('h2');

  // Extract all columns from the .row child
  const row = element.querySelector('.row');
  let colBlocks = [];
  if (row) {
    colBlocks = Array.from(row.children);
  } else {
    colBlocks = [];
  }

  // Build the cells by referencing the <a> elements directly, preserving their children (so text is kept)
  const cells = colBlocks.map((col) => {
    const link = col.querySelector('a');
    return link || col; // fallback: if no link, use the whole col
  });

  // Split the cells into rows of 3 columns (as seen in the screenshot example)
  const columnsPerRow = 3;
  const rows = [];
  for (let i = 0; i < cells.length; i += columnsPerRow) {
    rows.push(cells.slice(i, i + columnsPerRow));
  }

  // If heading is present, include it as its own row (in a div) above the columns
  let tableRows;
  if (heading) {
    tableRows = [headerRow, [heading], ...rows];
  } else {
    tableRows = [headerRow, ...rows];
  }

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
