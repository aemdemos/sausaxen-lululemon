/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container .row structure
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  // Find both columns
  const cols = Array.from(row.children);
  let leftCol = cols.find(div => div.classList.contains('col-md-3'));
  let rightCol = cols.find(div => div.classList.contains('col-md-9'));
  if (!leftCol || !rightCol) {
    // fallback in case classes change
    if (cols.length === 2) {
      leftCol = cols[0];
      rightCol = cols[1];
    } else {
      return;
    }
  }
  // Build block table
  const header = ['Columns (columns59)'];
  const row1 = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    header,
    row1,
  ], document);
  element.replaceWith(table);
}
