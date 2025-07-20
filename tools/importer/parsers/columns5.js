/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell array
  const headerRow = ['Columns (columns5)'];

  // Find the direct .row containing the two columns
  const row = element.querySelector('.container > .row');
  if (!row) return;

  const leftCol = row.querySelector('.col-lg-8');
  const rightCol = row.querySelector('.col-lg-4');

  let leftContent = null;
  if (leftCol) {
    leftContent = leftCol.querySelector('.p-4.bg-white');
    if (!leftContent) leftContent = leftCol;
  }
  let rightContent = null;
  if (rightCol) {
    rightContent = rightCol.querySelector('.p-4.bg-white.NewsAdts');
    if (!rightContent) rightContent = rightCol;
  }

  // Second row: both content columns; must be a single array of both
  const columnsRow = [leftContent, rightContent].filter(Boolean);
  if (columnsRow.length === 0) return;

  // Final structure: header row with 1 column, then content row with N columns
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
