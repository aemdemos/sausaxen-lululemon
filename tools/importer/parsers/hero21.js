/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero21)'];

  // 2. Background image row
  let bgImgEl = null;
  const bgImageDiv = element.querySelector('.bg-image');
  if (bgImageDiv) {
    const img = bgImageDiv.querySelector('img');
    if (img) {
      bgImgEl = img;
    }
  }

  // 3. Content row
  let contentCell = [];
  // Find column containing the main content
  const col = element.querySelector('.container .row .col-lg-6');
  if (col) {
    // Headline (h1)
    const h1 = col.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Subheading (p)
    const p = col.querySelector('p');
    if (p) contentCell.push(p);
    // CTA (link not in breadcrumb)
    const links = col.querySelectorAll('a');
    for (const link of links) {
      // Exclude breadcrumb link (inside ul)
      if (!link.closest('ul')) {
        contentCell.push(link);
      }
    }
  }

  // Ensure at least one empty content if nothing was found
  if (contentCell.length === 0) {
    contentCell = [''];
  }

  // Compose the table
  const tableRows = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
