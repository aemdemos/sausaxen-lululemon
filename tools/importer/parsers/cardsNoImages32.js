/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name
  const headerRow = ['Cards (cardsNoImages32)'];
  const rows = [headerRow];

  // Get all card rows
  const cardRows = element.querySelectorAll('.row.bg-white.p-3.border-bottom');

  cardRows.forEach(card => {
    // Get the left column (title/description)
    const leftCol = card.querySelector('.col-md-9');
    // Get the right column (View link)
    const rightCol = card.querySelector('.col-md-3');

    const content = [];
    // Title (always inside <a> in leftCol)
    if (leftCol) {
      const titleAnchor = leftCol.querySelector('a');
      if (titleAnchor) {
        const strong = document.createElement('strong');
        strong.textContent = titleAnchor.textContent.trim();
        content.push(strong);
      } else if (leftCol.textContent.trim()) {
        // Fallback to plain text if anchor missing
        const strong = document.createElement('strong');
        strong.textContent = leftCol.textContent.trim();
        content.push(strong);
      }
    }
    // If rightCol has the CTA/link, append it after a break
    if (rightCol) {
      const ctaAnchor = rightCol.querySelector('a');
      if (ctaAnchor) {
        content.push(document.createElement('br'));
        content.push(ctaAnchor);
      }
    }
    rows.push([content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
