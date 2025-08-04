/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero58)'];

  // 2nd row: Background image (optional)
  let bgImgEl = '';
  const bgImg = element.querySelector('.map .bg-images img');
  if (bgImg) {
    bgImgEl = bgImg;
  }

  // 3rd row: text block (Title, subheading, cta, all text content)
  // Get .map-above-content block, which contains all text and CTA
  let contentBlock = '';
  const mapAboveContent = element.querySelector('.map-above-content');
  if (mapAboveContent && mapAboveContent.textContent.trim().length > 0) {
    contentBlock = mapAboveContent;
  }

  // If the block is empty or not found, leave the cell empty for robustness

  const cells = [
    headerRow,
    [bgImgEl],
    [contentBlock]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
