/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as a single cell (matches example exactly)
  const headerRow = ['Columns (columns19)'];

  // Get all immediate child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab all its content (not just the link!) for fully robust extraction
  const cols = columnDivs.map((col) => {
    // Use all children of the col div, to preserve heading/structure
    // If there are no children, use the text directly
    if (col.children.length) {
      return Array.from(col.children);
    } else {
      return col.textContent.trim();
    }
  });

  // Build the table: header row (single cell), then a second row with N cells (1 per column)
  const table = [headerRow, cols];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
