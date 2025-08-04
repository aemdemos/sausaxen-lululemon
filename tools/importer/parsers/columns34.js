/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as a single column, per the example
  const headerRow = ['Columns (columns34)'];

  // Extract the two columns directly under the .row
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get the direct child div (which contains the actual content)
  // If not available, fallback to the column itself
  const cellElements = columns.map(col => {
    const content = col.querySelector(':scope > div');
    return content ? content : col;
  });

  // The table structure: header row (single cell), then a row with both columns
  const tableRows = [headerRow, cellElements];

  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
