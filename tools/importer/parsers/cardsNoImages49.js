/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table structure: header row, then one row per card
  const cells = [];
  // Block header must exactly match the example
  const headerRow = ['Cards (cardsNoImages49)'];
  cells.push(headerRow);

  // Get the main card columns from the section
  const row = element.querySelector('.container > .row');
  if (!row) return;

  // Get left card: News and Updates (with links and a button)
  const leftCol = row.querySelector('.col-lg-4');
  if (leftCol) {
    // The whole card including heading, list, and cta
    const card = leftCol.querySelector('.bg-white.box-shadow.p-4');
    if (card && card.textContent.trim()) {
      cells.push([card]);
    }
  }

  // Get right card: Managing Director Message (clickable whole card)
  const rightCol = row.querySelector('.col-lg-8');
  if (rightCol) {
    // This card is a link wrapping a div structure
    const card = rightCol.querySelector('a');
    if (card && card.textContent.trim()) {
      cells.push([card]);
    }
  }

  // Only create the table if there's anything to output
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
