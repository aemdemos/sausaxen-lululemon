/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row containing the stat columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get all the immediate children (each stat column)
  const statCols = Array.from(row.children);
  // For each stat block, extract its direct .stats child (which holds the content)
  // Reference the direct .stats nodes from the DOM, not clone
  const cellsContent = statCols.map((col) => {
    const stats = col.querySelector('.stats');
    return stats || col;
  });
  // The first row must be a single column header (single cell array)
  const tableRows = [
    ['Columns (columns35)'],
    cellsContent
  ];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element with the new table
  element.replaceWith(block);
}
