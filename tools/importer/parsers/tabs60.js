/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab <li> elements (immediate children)
  const tabItems = Array.from(element.querySelectorAll(':scope > li'));
  // Build rows: [tab label, tab content (blank since missing)]
  const rows = tabItems.map(li => {
    const a = li.querySelector('a');
    const label = a ? a.textContent.trim() : '';
    // Tab content: not present in provided HTML, so leave blank
    const content = '';
    return [label, content];
  });
  // Construct cells: header row is one cell, then multiple rows with two cells each
  const cells = [
    ['Tabs'], // Header row (only one column)
    ...rows
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
