/* global WebImporter */
export default function parse(element, { document }) {
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  const rows = [];
  // Header
  rows.push(['Accordion (accordion16)']);

  // Accordion items: .card-header[data-bs-toggle]
  const headers = accordion.querySelectorAll('.card-header[data-bs-toggle]');
  headers.forEach((header) => {
    // Title cell: prefer .card-title inside header, fallback to header itself
    let titleEl = header.querySelector('.card-title') || header;

    // Find the next sibling .card-body
    let sibling = header.nextElementSibling;
    while (sibling && !(sibling.classList.contains('card-body'))) {
      sibling = sibling.nextElementSibling;
    }
    let contentCell = null;
    if (sibling) {
      // Try to find all .container.mt-4 blocks in .card-body
      const containers = Array.from(sibling.querySelectorAll(':scope > .p-4 > .container.mt-4, :scope > .container.mt-4'));
      if (containers.length === 0) {
        // No .container.mt-4, fallback to full .card-body
        contentCell = sibling;
      } else if (containers.length === 1) {
        contentCell = containers[0];
      } else {
        // Multiple containers: wrap in a div
        const wrapper = document.createElement('div');
        containers.forEach(c => wrapper.appendChild(c));
        contentCell = wrapper;
      }
    } else {
      // No content found, use an empty string
      contentCell = document.createTextNode('');
    }
    rows.push([titleEl, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
