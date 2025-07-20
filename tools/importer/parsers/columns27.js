/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from example
  const headerRow = ['Columns (columns27)'];

  // Gather all tab-pane children
  const tabPanes = Array.from(element.querySelectorAll(':scope > .tab-pane'));

  // Each tab-pane (visible or not) is presented as a row in the columns block (consistency with the screenshots)
  const tableRows = [headerRow];

  tabPanes.forEach((tabPane) => {
    // Find the top .row inside each tab-pane
    const row = tabPane.querySelector(':scope > .row');
    if (row) {
      // Get direct child columns
      const cols = Array.from(row.querySelectorAll(':scope > div'));
      // The standard structure is two columns - left (text), right (image or empty)
      let leftCol = null;
      let rightCol = null;
      if (cols.length === 2) {
        leftCol = cols[0];
        rightCol = cols[1];
      } else if (cols.length === 1) {
        leftCol = cols[0];
        rightCol = document.createElement('div'); // empty for missing
      } else {
        leftCol = document.createElement('div');
        rightCol = document.createElement('div');
      }
      tableRows.push([leftCol, rightCol]);
    }
  });

  // Only replace if there is content
  if (tableRows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  }
}
