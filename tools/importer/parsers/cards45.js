/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards45)'];

  // Find the carousel container
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;

  // Get all unique card items in order, skipping 'cloned' duplicates
  // If there are non-cloned items, use those; otherwise, fallback to all
  let allItems = Array.from(carousel.querySelectorAll('.bootstrape-stage .bootstrape-item'));
  const mainItems = allItems.filter(item => !item.classList.contains('cloned'));
  if (mainItems.length > 0) allItems = mainItems;

  // For deduplication: use Set of href+text
  const seen = new Set();
  const cardRows = [];
  for (const itemDiv of allItems) {
    // Each 'itemDiv' should contain a '.item'
    const card = itemDiv.querySelector('.item') || itemDiv;

    // Find the image (may be inside a link)
    const img = card.querySelector('img');
    // Find the text/link container (usually a paragraph)
    const textNode = card.querySelector('p, .txt-xs, .text-center, .card-title');

    // Deduplicate based on image src + text content
    const textKey = (img ? img.src : '') + (textNode ? textNode.textContent.trim() : '');
    if (textKey && seen.has(textKey)) continue;
    seen.add(textKey);

    // --- FIRST CELL ---
    // Reference the <a> if the image is wrapped, otherwise just the <img>
    let imageCell = null;
    if (img) {
      const link = img.closest('a');
      if (link && link.contains(img)) {
        imageCell = link;
      } else {
        imageCell = img;
      }
    }
    // --- SECOND CELL ---
    // Reference the text content node, or fallback to nothing
    let textCell = null;
    if (textNode) {
      textCell = textNode;
    }

    // Only add row if both image and text exist
    if (imageCell && textCell) {
      cardRows.push([imageCell, textCell]);
    }
  }

  // Compose the table (header + card rows)
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
