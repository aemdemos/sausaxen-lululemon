/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards20)'];
  const rows = [headerRow];

  // Each card is wrapped in a .col-md-3.mb-3 (immediate children of the root)
  const cardDivs = element.querySelectorAll(':scope > div.col-md-3.mb-3');

  cardDivs.forEach(cardDiv => {
    // Image cell: find the first <img> inside the card
    const img = cardDiv.querySelector('img');
    const imageCell = img || '';

    // Text cell: use the anchor in .container as title text
    let textCell = '';
    const titleA = cardDiv.querySelector('.container p > a');
    if (titleA) {
      // Use <strong> to preserve the idea of heading styling
      const strong = document.createElement('strong');
      strong.textContent = titleA.textContent.trim();
      textCell = strong;
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
