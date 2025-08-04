/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first <section> (root of main content)
  const section = element.querySelector('section');
  if (!section) return;
  // Use the section's .container or the section itself
  const container = section.querySelector('.container') || section;

  // Collect all visible (not .d-none, not .loadMore) direct child elements
  const contentEls = Array.from(container.children).filter((child) => {
    if (child.classList) {
      if (child.classList.contains('d-none')) return false;
      if (child.classList.contains('loadMore')) return false;
    }
    return true;
  });

  // If no content remains, abort
  if (!contentEls.length) return;

  // Table rows as per block spec
  const rows = [
    ['Hero (hero1)'], // header (must match exactly)
    [''],             // background image row (none in example/source)
    [contentEls],     // all visible content as a single cell
  ];

  // Create and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
