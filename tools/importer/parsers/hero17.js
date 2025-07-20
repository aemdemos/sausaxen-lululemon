/* global WebImporter */
export default function parse(element, { document }) {
  // Header for Hero block
  const headerRow = ['Hero (hero17)'];

  // --- Extract background image (if present) ---
  let bgImg = '';
  const bgImagesDiv = element.querySelector(':scope > .bg-images');
  if (bgImagesDiv) {
    const bgImgEl = bgImagesDiv.querySelector('img');
    if (bgImgEl) {
      bgImg = bgImgEl;
    }
  }

  // --- Extract content (headline, list, etc) ---
  let content = '';
  // The hero text content lives in container > row > col-lg-5 > .dredging-fleet
  const container = element.querySelector(':scope > .container');
  if (container) {
    const col = container.querySelector(':scope > .row > .col-lg-5');
    if (col) {
      const fleet = col.querySelector(':scope > .dredging-fleet');
      if (fleet) {
        content = fleet;
      }
    }
  }

  // Compose table as per the block specification: header, bg image, content
  const rows = [
    headerRow,
    [bgImg],
    [content],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
