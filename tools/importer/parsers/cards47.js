/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build a card row given the .row.no-gutters (card root)
  function buildCardRow(cardRowEl) {
    // Find the first img in the card row
    const img = cardRowEl.querySelector('img');
    // Find the text content container (bg-white or equivalent)
    let textContainer = null;
    // Look for any .bg-white or similar class, or fallback to other div
    const candidates = Array.from(cardRowEl.querySelectorAll('div'));
    for (const c of candidates) {
      if (c.className && c.className.match(/bg-white/)) {
        textContainer = c;
        break;
      }
    }
    if (!textContainer) {
      // Fallback: use the next sibling of the image's parent
      if (img && img.parentElement && img.parentElement.nextElementSibling) {
        textContainer = img.parentElement.nextElementSibling;
      }
    }
    // If still not found, fallback to the cardRowEl itself
    if (!textContainer) textContainer = cardRowEl;

    // Gather all text content: headings, paragraphs, links
    const cellContent = [];
    // Heading (h3 or .sectionheading)
    const heading = textContainer.querySelector('h3, .sectionheading');
    if (heading) cellContent.push(heading);
    // All <p> elements (may contain description or cta)
    const ps = Array.from(textContainer.querySelectorAll('p'));
    const added = new Set();
    ps.forEach((p) => {
      if (!added.has(p)) {
        cellContent.push(p);
        added.add(p);
      }
    });
    // If there are no <p>, but there is text, add remaining text nodes
    if (cellContent.length === 0) {
      const text = textContainer.textContent.trim();
      if (text) {
        cellContent.push(document.createTextNode(text));
      }
    }
    return [img, cellContent];
  }

  // Block header row
  const cells = [['Cards (cards47)']];

  // Card 1 (Adani Foundation): left col, .row.no-gutters.mb-3
  const left = element.querySelector('.col-lg-8');
  if (left) {
    const adaniRow = left.querySelector('.row.no-gutters');
    if (adaniRow) {
      cells.push(buildCardRow(adaniRow));
    }
  }
  // Card 2 (Conserving the Coastal Ecology): right col, .row.no-gutters
  const right = element.querySelector('.col-lg-4');
  if (right) {
    const ecologyRow = right.querySelector('.row.no-gutters');
    if (ecologyRow) {
      cells.push(buildCardRow(ecologyRow));
    }
  }

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
