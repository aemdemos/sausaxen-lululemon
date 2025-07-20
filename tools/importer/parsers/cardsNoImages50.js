/* global WebImporter */
export default function parse(element, { document }) {
  // Header as in the example
  const headerRow = ['Cards (cardsNoImages50)'];
  const rows = [headerRow];

  // Get all cards: direct children of .row inside the element
  const rowDiv = element.querySelector('.row');
  const cardDivs = rowDiv ? Array.from(rowDiv.children) : [];

  cardDivs.forEach((col) => {
    // Each .col-md-4.mb-4 contains an <a> which wraps the card content
    const a = col.querySelector('a');
    if (a) {
      // We want the text from the <p> inside tariff-block, but also the link, in one cell
      // To ensure all text from the p is included, preserve structure but reference existing elements
      const p = a.querySelector('p');
      if (p) {
        // Create a fragment so we can have both the card text and the link semantics
        const frag = document.createDocumentFragment();
        // Create a link that matches the appearance of the original
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = p.textContent.trim();
        frag.appendChild(link);
        rows.push([frag]);
      } else {
        // If no p, just use the <a> (as is, references existing element)
        rows.push([a]);
      }
    } else {
      // Fallback: put all text
      const text = col.textContent.trim();
      if (text) {
        rows.push([text]);
      }
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
