/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must exactly match block name
  const headerRow = ['Hero (hero65)'];

  // Second row: background image (none present in source HTML)
  const bgRow = [''];

  // Third row: content (title/cta)
  // The title and CTA are inside the section > div > h2
  // We want to preserve their structure and semantics
  let contentCell = '';
  const section = element.querySelector('section');
  if (section) {
    const container = section.querySelector('.container');
    if (container) {
      // Find the h2 inside container
      const h2 = container.querySelector('h2');
      if (h2) {
        // We want to reference the existing h2, but move the CTA <a> outside the h2
        // The CTA is inside a <span> as the lastChild of h2
        // We'll extract the <a> and put it after the h2
        const span = h2.querySelector('span');
        let ctaLink = null;
        if (span) {
          ctaLink = span.querySelector('a');
        }
        // Remove the span (and thus the link) from the h2
        if (span) {
          span.remove();
        }
        // Build the cell contents: h2, then if present, the CTA link (with a <br> if both)
        const content = [];
        content.push(h2);
        if (ctaLink) {
          // Insert a break if the link doesn't already appear on its own line
          content.push(document.createElement('br'));
          content.push(ctaLink);
        }
        contentCell = content;
      }
    }
  }
  const tableRows = [
    headerRow,
    bgRow,
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
