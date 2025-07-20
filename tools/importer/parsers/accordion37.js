/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root inside the given element
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // Start with the block header
  const rows = [
    ['Accordion (accordion37)']
  ];

  // Select all .card-header elements (each is a question)
  const cardHeaders = accordion.querySelectorAll('.card-header');

  cardHeaders.forEach(header => {
    // Title cell: use the .card-title inside the header if present, else use the whole header
    let title = header.querySelector('.card-title') || header;

    // Content cell: answer is in .card-body (may be nextElementSibling or next-next)
    let answer = header.nextElementSibling;
    // Skip .bg-gray divider(s) if present
    while (answer && answer.classList.contains('bg-gray')) {
      answer = answer.nextElementSibling;
    }
    // .card-body (may contain a .p-4, or direct element)
    let contentCell = null;
    if (answer && answer.classList.contains('card-body')) {
      // Use all children of card-body
      // If only a single element, use it, else use all as array
      let blockDiv = answer.querySelector('.p-4');
      if (blockDiv) {
        // If .p-4, use it
        contentCell = blockDiv;
      } else {
        // Otherwise, use all element children
        const els = Array.from(answer.children);
        if (els.length === 0) {
          contentCell = answer;
        } else if (els.length === 1) {
          contentCell = els[0];
        } else {
          contentCell = els;
        }
      }
    } else if (answer && (answer.classList.contains('p-4') || answer.tagName === 'P' || answer.tagName === 'UL')) {
      // Handle rare case where answer is a .p-4 or <p> or <ul> directly
      contentCell = answer;
    } else if (answer) {
      contentCell = answer;
    } else {
      // fallback: empty span
      contentCell = document.createElement('span');
    }
    rows.push([title, contentCell]);
  });

  // Build and replace the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
