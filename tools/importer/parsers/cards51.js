/* global WebImporter */
export default function parse(element, { document }) {
  // Gather relevant content for one card: the nav tab with its text (no images in given HTML)
  // Use the entire provided element as the text content for the card cell

  // Extract the nav-link text for the card text content
  let cardText = '';
  const navLink = element.querySelector('.nav-link');
  if (navLink) {
    cardText = navLink.textContent.trim();
  } else {
    cardText = element.textContent.trim();
  }

  // Prepare table structure
  // Header row (matches block name exactly)
  const cells = [
    ['Cards (cards51)']
  ];
  // Only add card row if there is card text
  if (cardText) {
    // First col: image/icon (none in source)
    // Second col: text content (nav text)
    cells.push(['', cardText]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}