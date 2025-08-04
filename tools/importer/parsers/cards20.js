/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards20)'];
  const cards = Array.from(element.querySelectorAll(':scope > div.col-md-3'));
  const rows = cards.map(card => {
    // Find the image
    const img = card.querySelector('img');
    // Find the container for text content
    let textCellContent = [];
    // Find the port name - inside a <p><a>...</a></p> in the last div.container
    let title = '';
    let description = '';
    const container = card.querySelector('.container');
    if (container) {
      const a = container.querySelector('a');
      if (a) {
        title = a.textContent.trim();
      }
      // Find any description under the title in the container
      // (look for a p after the a, or any other text node)
      const allPs = Array.from(container.querySelectorAll('p'));
      // description is any <p> after the one with the <a>
      for (let p of allPs) {
        // If the <p> does not contain an <a>, it's likely a description
        if (!p.querySelector('a')) {
          description += (description ? ' ' : '') + p.textContent.trim();
        }
      }
    }
    // Fallback if not found
    if (!title && img && img.alt) {
      title = img.alt.trim();
    }
    // Create title node as <strong>
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      textCellContent.push(strong);
    }
    // Add description if present
    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description;
      textCellContent.push(descP);
    }
    // If nothing in text cell (shouldn't happen), add an empty string
    if (textCellContent.length === 0) textCellContent = [''];
    return [img, textCellContent];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
