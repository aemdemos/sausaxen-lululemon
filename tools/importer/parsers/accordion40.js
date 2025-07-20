/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('#accordion');
  if (!accordion) return;

  // Prepare table rows, starting with header
  const rows = [['Accordion (accordion40)']];

  // Helper to get next sibling matching a selector
  function getNextSibling(el, selector) {
    let sib = el.nextElementSibling;
    while (sib) {
      if (sib.matches(selector)) return sib;
      sib = sib.nextElementSibling;
    }
    return null;
  }

  // Each accordion item is a .card-header followed by a .card-body
  const headers = accordion.querySelectorAll('.card-header');
  headers.forEach(header => {
    // Title cell
    let titleNode = header.querySelector('.card-title');
    if (!titleNode) titleNode = header;
    // Content cell
    let body = getNextSibling(header, '.card-body');
    let contentCell = '';
    if (body) {
      // Prefer .p-4 direct child if present
      const p4 = body.querySelector('.p-4');
      if (p4) {
        contentCell = p4;
      } else {
        contentCell = body;
      }
    } else {
      contentCell = document.createTextNode('');
    }
    rows.push([titleNode, contentCell]);
  });

  // Create and replace table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
