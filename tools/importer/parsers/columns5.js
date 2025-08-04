/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main columns: left and right
  const row = element.querySelector('.container > .row');
  if (!row) return;
  const leftCol = row.querySelector('.col-lg-8.padd-box');
  const rightCol = row.querySelector('.col-lg-4.padd-box');
  if (!leftCol || !rightCol) return;

  // LEFT CELL: Get the main white box
  const leftBox = leftCol.querySelector('.p-4.bg-white.h-100');
  // RIGHT CELL: Get the main white box
  const rightBox = rightCol.querySelector('.p-4.bg-white.NewsAdts');
  if (!leftBox || !rightBox) return;

  // Correct table structure: single cell header row, two cells in second row
  const tableRows = [
    ['Columns (columns5)'],
    [leftBox, rightBox]
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
