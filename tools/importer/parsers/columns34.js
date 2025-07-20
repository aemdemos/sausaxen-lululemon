/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const colCount = columns.length;

  // Gather column content
  const colContents = columns.map((col) => {
    // Use the first child div if present (to skip grid wrappers), else the col itself
    const inner = col.querySelector(':scope > div');
    if (inner) return inner;
    return col;
  });

  // Build cells: header row is a single cell, next row is colCount cells
  const cells = [
    ['Columns (columns34)'],
    colContents
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
