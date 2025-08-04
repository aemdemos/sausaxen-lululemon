/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards6) block requires 2 columns for each card: image/icon (col 1), text content (col 2)
  // The header row must have exactly one column

  const headerRow = ['Cards (cards6)'];
  const select = element.querySelector('select');
  if (!select) return;

  // Place the select in the text cell, leave image cell empty
  const cardRow = ['', select];

  // Table structure: header (1 column), then each row (2 columns)
  const cells = [
    headerRow,
    cardRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
