/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel area
  const carousel = element.querySelector('.mainBanner .bootstrape-carousel');
  if (!carousel) return;

  // Find all slides in the carousel
  const slideNodes = carousel.querySelectorAll('.bootstrape-stage-outer .bootstrape-item .item');
  const rows = [];
  // Use the exact header per the example
  rows.push(['Carousel (carousel14)']);

  slideNodes.forEach((item) => {
    // Get the image element (direct reference)
    const img = item.querySelector('.slider-content img');

    // Text cell: gather all semantic text content under the slider-content, except for the image
    let textCell = '';
    const sliderContent = item.querySelector('.slider-content');
    if (sliderContent) {
      // Remove img for text extraction
      const imgEl = sliderContent.querySelector('img');
      if (imgEl) imgEl.remove();
      // Gather all valid nodes (elements or text nodes with non-empty text)
      const textNodes = Array.from(sliderContent.childNodes)
        .filter(n => (n.nodeType === 1 && n.textContent.trim()) || (n.nodeType === 3 && n.textContent.trim()));
      if (textNodes.length === 1) {
        textCell = textNodes[0];
      } else if (textNodes.length > 1) {
        textCell = textNodes;
      }
      // If no text found, leave as ''
    }
    // Re-insert img in case DOM use is needed further (safety for subsequent iterations)
    if (img && !sliderContent.contains(img)) {
      sliderContent.insertBefore(img, sliderContent.firstChild);
    }
    // Only push if there's valid image
    if (img) {
      rows.push([img, textCell]);
    }
  });

  // Create and replace carousel block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
