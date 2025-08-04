/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // Prepare rows: header first
  const rows = [];
  rows.push(['Accordion (accordion40)']);

  // Get all children of .accordion in order
  const children = Array.from(accordion.children);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.classList.contains('card-header')) {
      // Title cell: get text from .card-title, fallback to text content
      let title = '';
      const titleEl = child.querySelector('.card-title');
      if (titleEl) {
        title = titleEl.textContent.trim();
      } else {
        title = child.textContent.trim();
      }
      // Content cell: find next .card-body sibling
      let content = '';
      let j = i + 1;
      while (j < children.length) {
        const bodyCandidate = children[j];
        if (bodyCandidate.classList.contains('card-body')) {
          // If there's a .row, gather all .col-md-4.mb-4 children, else use the card-body itself
          const contentEls = [];
          const rowEls = bodyCandidate.querySelectorAll('.row');
          if (rowEls.length > 0) {
            rowEls.forEach(row => {
              Array.from(row.children).forEach(col => {
                // Add the actual children of .col-md-4.mb-4, reference original elements
                Array.from(col.childNodes).forEach(node => {
                  contentEls.push(node);
                });
              });
            });
          } else {
            // No .row, just use all children of card-body
            Array.from(bodyCandidate.childNodes).forEach(node => {
              contentEls.push(node);
            });
          }
          // If only one element, just use it, else use array
          content = contentEls.length === 1 ? contentEls[0] : contentEls;
          break;
        }
        j++;
      }
      // Add row ONLY if title is present
      if (title) {
        rows.push([title, content]);
      }
    }
  }

  // Create the accordion block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
