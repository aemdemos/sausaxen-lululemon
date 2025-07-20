/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards25)'];
  const rows = [];

  // Select all card containers for directors
  const cardContainers = element.querySelectorAll('.row > .directors-tile');

  cardContainers.forEach((container) => {
    // Find the card within the container
    const card = container.querySelector('.card');
    if (!card) return;

    // First cell: the image (reference the existing image element)
    const img = card.querySelector('img');

    // Second cell: all content from .card-body (preserve HTML structure)
    const cardBody = card.querySelector('.card-body');
    let textCell;
    if (cardBody) {
      // Reference the .card-body element directly to keep all text and structure
      textCell = cardBody;
    } else {
      // Fallback: empty string if missing
      textCell = '';
    }

    rows.push([
      img,
      textCell
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
