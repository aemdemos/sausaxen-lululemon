/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: block name, one column
  const headerRow = ['Columns (columns31)'];

  // Find columns (usually two in this layout)
  const row = element.querySelector('.row');
  let col1 = undefined, col2 = undefined;
  if (row) {
    const cols = row.querySelectorAll(':scope > div');
    if (cols[0]) {
      // Use the full left block, which contains the image
      col1 = cols[0].querySelector('.slideItem') || cols[0];
    }
    if (cols[1]) {
      col2 = cols[1].querySelector('.video-content') || cols[1];
    }
  }

  // Only add the content row if we have at least one column
  const rows = [headerRow];
  if (col1 || col2) {
    // For a two-column row, both should be present, but if not, keep by position
    rows.push([
      col1 ? col1 : '',
      col2 ? col2 : ''
    ]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
