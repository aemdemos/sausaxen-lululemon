/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - must match exactly
  const cells = [['Cards (cardsNoImages13)']];

  // Select all direct card columns
  const cardColumns = element.querySelectorAll('.row > .col-md-4, .row > .col-md-4.padd-box');

  cardColumns.forEach(cardCol => {
    // Find the inner card content wrapper or fallback to cardCol
    let cardContent = cardCol.querySelector('.p-4.w-100.h-100.bg-white, .p-4.w-100.h-200.bg-white');
    if (!cardContent) cardContent = cardCol;

    const fragment = document.createDocumentFragment();

    // 1. Heading (optional)
    const heading = cardContent.querySelector('h3.section-heading');
    if (heading) fragment.appendChild(heading);

    // 2. List (ul.ul-download-icon), can be inside complex carousel
    let ul = cardContent.querySelector('ul.ul-download-icon');
    if (!ul) {
      // Look for ul inside a carousel structure
      const carouselUl = cardContent.querySelector('.bootstrape-carousel ul.ul-download-icon');
      if (carouselUl) {
        ul = carouselUl;
      }
    }
    if (ul) fragment.appendChild(ul);

    // 3. Any <p> that is a direct child of cardContent, and not inside ul/li
    // (e.g., "Read more" CTA)
    Array.from(cardContent.children).forEach(child => {
      if (child.tagName === 'P' && !child.closest('li')) {
        fragment.appendChild(child);
      }
    });

    // Add this card's content as a single cell row
    cells.push([fragment]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
