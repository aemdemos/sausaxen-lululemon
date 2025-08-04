/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing columns
  const row = element.querySelector('.row');
  let cols = [];
  if (row) {
    cols = Array.from(row.querySelectorAll(':scope > div'));
  }

  // Prepare the content row - each col as a table cell
  const contentRow = cols.map((col) => {
    // Collect all child nodes that are elements or non-empty text
    const fragment = document.createDocumentFragment();
    const children = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
      return false;
    });
    children.forEach(child => fragment.appendChild(child));
    // If only one node, just return the node itself for cleaner output
    if (fragment.childNodes.length === 1) {
      return fragment.firstChild;
    }
    return fragment;
  });

  // Create the table with the proper header row (one cell)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns55)'], // header row: one cell only
    contentRow               // second row: as many cells as columns
  ], document);

  // Ensure the header cell spans all columns
  // WebImporter.DOMUtils.createTable does not apply colspan, so we add it here
  const headerTh = table.querySelector('tr:first-child th');
  if (headerTh && contentRow.length > 1) {
    headerTh.setAttribute('colspan', contentRow.length);
  }

  // Replace original element with the new table
  element.replaceWith(table);
}
