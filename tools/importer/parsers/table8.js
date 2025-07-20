/* global WebImporter */
export default function parse(element, { document }) {
  // Find the ul.nav-tabs inside the given element
  const ul = element.querySelector('ul');
  if (!ul) return;
  const links = Array.from(ul.querySelectorAll('li.nav-item > a.nav-link'));
  if (links.length === 0) return;

  // Prepare rows: first row is single cell 'Table', second row is tab names
  const tabNames = links.map(link => link.textContent.trim());
  const rows = [['Table'], tabNames];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set the header th's colspan to the number of tab columns
  const th = table.querySelector('tr:first-child th');
  if (th) {
    th.setAttribute('colspan', tabNames.length);
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
