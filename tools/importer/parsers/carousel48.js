/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel container
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;

  // Get all slides
  const slideNodes = carousel.querySelectorAll('.bootstrape-item .item');
  const rows = [];

  slideNodes.forEach((item) => {
    // First cell: Image (mandatory)
    const img = item.querySelector('img');
    const imageElem = img || '';

    // Second cell: All text content preserving source order and structure
    const contentDiv = item.querySelector('div.vertical-fourth');
    let cellContent = '';
    if (contentDiv) {
      // If there is any content, append all child nodes (preserve existing elements)
      const children = Array.from(contentDiv.childNodes).filter(node => {
        if (node.nodeType === 3) {
          // Text node with visible text
          return node.textContent.trim().length > 0;
        }
        // element nodes
        return true;
      });
      if (children.length > 0) {
        cellContent = children;
      }
    }
    rows.push([imageElem, cellContent && cellContent.length > 0 ? cellContent : '']);
  });

  // Table header per the example (exact text)
  const tableRows = [
    ['Carousel (carousel48)'],
    ...rows
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
