/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header as in the example
  const headerRow = ['Cards (cardsNoImages13)'];
  const cells = [headerRow];

  // Find all top-level card columns (assume .row > .col-md-4 is the intended card selector)
  const cardCols = element.querySelectorAll(':scope .row > .col-md-4');

  cardCols.forEach(col => {
    // Find the card content container
    // Some cards have their content wrapped in an additional div (e.g., .padd-box > .p-4.w-100.h-100.bg-white)
    let cardContent = col;
    // If there is exactly one child div, use it as the card content
    const directDivs = col.querySelectorAll(':scope > div');
    if (directDivs.length === 1) {
      cardContent = directDivs[0];
    }

    // Collect content in order: heading, list, additional p's, any cta links
    const cardCellContent = [];

    // 1. Heading (h3) if present
    const heading = cardContent.querySelector('h3, .section-heading');
    if (heading) cardCellContent.push(heading);

    // 2. List (ul.ul-download-icon) if present
    const ul = cardContent.querySelector('ul.ul-download-icon');
    if (ul) cardCellContent.push(ul);

    // 3. Find any <p> or <div> with class text-right that are direct children (for CTA) *after* the list
    // Only select p/div.text-right that are direct children of cardContent
    cardContent.childNodes.forEach(node => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        ((node.tagName === 'P' && (!ul || !ul.contains(node))) ||
         (node.tagName === 'DIV' && node.classList.contains('text-right')))
      ) {
        // Avoid duplicating p's already inside the list
        cardCellContent.push(node);
      }
    });

    // 4. If cardContent has no heading, ul, or p, fallback: include all childNodes (for resilience)
    if (cardCellContent.length === 0) {
      cardCellContent.push(...Array.from(cardContent.childNodes));
    }

    // Add this card row to table. Each card is a single cell in its row.
    cells.push([cardCellContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
