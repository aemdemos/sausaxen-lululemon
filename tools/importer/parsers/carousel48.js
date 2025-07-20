/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Carousel (carousel48)'];

  // Find the carousel column (the col that contains .bootstrape-carousel)
  const cols = element.querySelectorAll(':scope > div > div > div');
  let carouselCol = null;
  for (const col of cols) {
    if (col.querySelector('.bootstrape-carousel')) {
      carouselCol = col;
      break;
    }
  }
  if (!carouselCol) return;

  const carousel = carouselCol.querySelector('.bootstrape-carousel');
  if (!carousel) return;

  // Find all slides in the carousel
  const items = carousel.querySelectorAll('.bootstrape-item .item');
  if (!items.length) return;

  const cells = [headerRow];
  items.forEach((item) => {
    // First cell: the <img> element (reference only, do not clone)
    const img = item.querySelector('img');

    // Second cell: All non-image content, preserving headings, paragraphs, formatting
    // We'll use the .vertical-fourth div inside the slide, if present, else all non-image children
    let textContent = '';
    const textContainer = item.querySelector('.vertical-fourth') || Array.from(item.children).find(child => child.tagName !== 'IMG');
    if (textContainer) {
      // Collect all childNodes (including text nodes and elements)
      const nodes = Array.from(textContainer.childNodes).filter(node => {
        // Only add elements or text, skip empty text
        return node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '';
      });
      if (nodes.length > 0) {
        textContent = nodes;
      }
    }
    cells.push([
      img,
      textContent && textContent.length ? textContent : ''
    ]);
  });

  // Create and replace with the block table
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
