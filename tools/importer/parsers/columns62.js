/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single-cell row with the block name
  const headerRow = ['Columns (columns62)'];

  // Get the .row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Find all the immediate child .col-lg-4 elements
  const cols = Array.from(row.children).filter(col => col.classList.contains('col-lg-4'));

  // For each column, extract the anchor if present, else the content div
  const cellsRow = cols.map(col => {
    const contentDiv = col.querySelector('.bg-white');
    if (!contentDiv) return '';
    const anchor = contentDiv.querySelector('a');
    if (anchor && contentDiv.children.length === 1) {
      return anchor;
    }
    return contentDiv;
  });

  // The cells array: header is a single cell, the content row has one cell per column
  const cells = [
    headerRow,
    cellsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
