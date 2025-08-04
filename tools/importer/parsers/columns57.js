/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Look for the known content structure
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  const col = row.querySelector('.col-lg-12');
  if (!col) return;
  const box = col.querySelector('.bg-gradient');
  if (!box) return;

  // The example shows a single columns block with 1 column
  // The header must exactly match 'Columns (columns57)'
  const headerRow = ['Columns (columns57)'];
  // The content cell is the entire box with heading, paragraphs, and contact info
  const contentRow = [box];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
