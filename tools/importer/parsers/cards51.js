/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards51) block expects: header row, then 1 row per card (image, text)
  // In this source, there is no card structure, just a nav tab with text.
  // We must preserve the tab label text as the only content row after the header.

  // Extract the tab label ("Analyst Coverage")
  let tabLabel = '';
  // Try to find the anchor inside the nav tab
  const anchor = element.querySelector('a.nav-link');
  if (anchor) {
    tabLabel = anchor.textContent.trim();
  } else {
    // Fallback: get all text content, fallback to empty string if not found
    tabLabel = element.textContent.trim();
  }

  const cells = [
    ['Cards (cards51)'],
    [tabLabel]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
