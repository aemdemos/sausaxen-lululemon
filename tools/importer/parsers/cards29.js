/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // Select all direct card blocks
  const cardWrappers = element.querySelectorAll(':scope > div');
  cardWrappers.forEach((cardWrapper) => {
    // Card content is inside <a> > .card
    const link = cardWrapper.querySelector('a');
    if (!link) return;
    // Find the main image (first <img> in the card)
    const img = link.querySelector('img');
    // Find title (h4.card-title) and description (p.card-text)
    const title = link.querySelector('.card-title');
    const desc = link.querySelector('.card-text');

    // Build text cell preserving structure
    const textCellContent = [];
    if (title) {
      // Use <span> for strong title to retain structure/reference existing element
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCellContent.push(strong);
      // Add line break only if description exists
      if (desc) {
        textCellContent.push(document.createElement('br'));
      }
    }
    if (desc) {
      textCellContent.push(desc.textContent);
    }

    rows.push([
      img,
      textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
