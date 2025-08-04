/* global WebImporter */
export default function parse(element, { document }) {
  // The source HTML is a nav tab bar; cards are not present yet.
  // But we must include all visible text content from the element.
  // Use the nav-link anchors as the content for one card row.
  
  // Extract all nav-link anchors
  const navLinks = Array.from(element.querySelectorAll('a.nav-link'));
  // Compose a div to hold those links as in the source
  const wrapper = document.createElement('div');
  navLinks.forEach((a, i) => {
    if (i > 0) wrapper.appendChild(document.createTextNode(' '));
    wrapper.appendChild(a);
  });

  // Build the table: header, then row with nav tabs as content
  const cells = [
    ['Cards (cards11)'],
    [wrapper]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}