/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the main content (the link in the h5)
  const cells = columns.map(col => {
    // Expecting a single <h5><a></a></h5> inside each column
    const h5 = col.querySelector('h5');
    if (h5 && h5.firstElementChild && h5.firstElementChild.tagName.toLowerCase() === 'a') {
      return h5.firstElementChild;
    }
    // fallback: try direct <a>
    const link = col.querySelector('a');
    if (link) {
      return link;
    }
    // fallback: empty string
    return '';
  });

  // Build the table: header row is a single cell, second row is all columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns19)'],
    cells
  ], document);

  element.replaceWith(table);
}
