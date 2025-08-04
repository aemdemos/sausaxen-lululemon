/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab list (ul.nav-tabs) inside the element
  const tabList = element.querySelector('ul.nav-tabs');
  if (!tabList) return;

  // Find all <a> elements within the nav-tabs
  const tabLinks = Array.from(tabList.querySelectorAll('a'));

  // Header row: The block name must match exactly as 'Table' (per the example)
  const cells = [['Table']];

  // For each tab, add a row with just the tab text
  tabLinks.forEach(link => {
    cells.push([link.textContent.trim()]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
