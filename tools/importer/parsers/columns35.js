/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container that holds the stats and heading
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the .row containing the stat columns
  const row = container.querySelector('.row');
  if (!row) return;

  // Get all the immediate .col-* children (columns)
  const cols = Array.from(row.children).filter(
    (col) => col.className && col.className.match(/col/)
  );

  // For each column, extract its .stats element (or fallback to col)
  const colContents = cols.map((col) => {
    const stats = col.querySelector('.stats');
    return stats || col;
  });

  // Build the block table: Header row is a single cell, second row has one cell per column
  const cells = [
    ['Columns (columns35)'],
    colContents
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
