/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block: must match exactly
  const headerRow = ['Hero (hero21)'];

  // Find the background image (first <img> in .bg-image)
  let bgImg = null;
  const bgImageDiv = element.querySelector('.bg-image');
  if (bgImageDiv) {
    const img = bgImageDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // Second row: background image, or null if not found
  const backgroundRow = [bgImg];

  // Third row: All text elements in correct order (h1, p, cta if any)
  // In this HTML, content is in .container > .row > .col-lg-6
  let contentCell = [];
  const col = element.querySelector('.container .row .col-lg-6');
  if (col) {
    // Headline
    const h1 = col.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Subheading/paragraph (optional)
    const p = col.querySelector('p');
    if (p) contentCell.push(p);
    // Call-to-action: only include a link if present and not just a breadcrumb
    // Check for links after h1 or p (but in this HTML, only the breadcrumb exists, which should be ignored)
    // If a CTA is added in future, e.g. a link after h1/p, it will be included here
    // For robustness, look for <a> tags that are not inside the <ul> breadcrumb
    const allLinks = col.querySelectorAll('a');
    allLinks.forEach(link => {
      // Exclude from breadcrumb (inside ul)
      if (!link.closest('ul')) {
        contentCell.push(link);
      }
    });
  }
  // If nothing found, keep empty array (handled gracefully)

  const contentRow = [contentCell];

  // Compose the table structure
  const cells = [headerRow, backgroundRow, contentRow];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
