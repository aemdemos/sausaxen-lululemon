/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block name
  const headerRow = ['Columns (columns63)'];

  // Find the row of column blocks
  const row = element.querySelector('.row');
  if (!row) return;

  // Each direct child div of .row is a column
  const colDivs = Array.from(row.querySelectorAll(':scope > div'));

  // Collect anchor elements from each column div
  const anchors = colDivs.map(colDiv => {
    const anchor = colDiv.querySelector('a');
    return anchor || '';
  });

  // For a 3-column grid, break into rows of 3 (as in the screenshot)
  const colsPerRow = 3;
  const contentRows = [];
  for (let i = 0; i < anchors.length; i += colsPerRow) {
    // Always make a full row of 3 cells, pad with empty string if needed
    const rowCells = anchors.slice(i, i + colsPerRow);
    while (rowCells.length < colsPerRow) rowCells.push('');
    contentRows.push(rowCells);
  }

  // Compose the table data
  const tableData = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
