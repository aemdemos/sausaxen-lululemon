/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards25) block header row
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Find the grid of cards
  const container = element.querySelector('.row');
  if (!container) return;

  // Get all card tile elements (direct children)
  const cardTiles = Array.from(container.children);

  cardTiles.forEach(tile => {
    // Find card within tile
    const card = tile.querySelector('.card');
    if (!card) return;

    // Extract image (reference existing element)
    const img = card.querySelector('img');

    // Extract text content from card-body
    const cardBody = card.querySelector('.card-body');
    const textCell = document.createElement('div');
    if (cardBody) {
      // Get all child nodes in order and preserve structure
      Array.from(cardBody.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'H4' || node.tagName === 'H3')) {
          // Make bold as in the example (strong)
          const strong = document.createElement('strong');
          strong.textContent = node.textContent.trim();
          textCell.appendChild(strong);
          textCell.appendChild(document.createElement('br'));
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
          textCell.appendChild(document.createTextNode(node.textContent.trim()));
          textCell.appendChild(document.createElement('br'));
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textCell.appendChild(document.createTextNode(node.textContent.trim()));
          textCell.appendChild(document.createElement('br'));
        }
      });
      // Remove trailing <br> if present
      if (textCell.lastChild && textCell.lastChild.tagName === 'BR') {
        textCell.removeChild(textCell.lastChild);
      }
    }

    // Only add row if at least one cell has content
    if (img || textCell.textContent.trim()) {
      rows.push([
        img,
        textCell.childNodes.length === 1 ? textCell.firstChild : Array.from(textCell.childNodes)
      ]);
    }
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
