/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section of Quick Links cards (left column)
  const mainRow = element.querySelector('.container > .row');
  if (!mainRow) return;
  const cardsCol = mainRow.querySelector('.col-lg-9');
  if (!cardsCol) return;
  const cardsGrid = cardsCol.querySelector('.row');
  if (!cardsGrid) return;
  const cardCols = Array.from(cardsGrid.querySelectorAll(':scope > div'));
  const rows = [];
  // Header row matches the example exactly
  rows.push(['Cards (cards22)']);
  // For each card
  cardCols.forEach((col) => {
    const link = col.querySelector('a');
    if (!link) return;
    const cardBlock = link.querySelector('.q-links');
    if (!cardBlock) return;
    // Get image: always inside .col-4
    const imgCol = cardBlock.querySelector('.col-4');
    const img = imgCol ? imgCol.querySelector('img') : null;
    // Get text: always inside .col-8
    const textCol = cardBlock.querySelector('.col-8');
    if (!textCol) return;
    // Compose the text cell: include all <p> elements from textCol in order, preserve structure
    const textCellFragments = [];
    const paragraphs = Array.from(textCol.querySelectorAll(':scope > p'));
    paragraphs.forEach((p, i) => {
      // First <p> is the card title, wrap in <strong>, preserve any inline formatting
      if (i === 0) {
        const strong = document.createElement('strong');
        // Move all child nodes (not just textContent) to strong
        while (p.firstChild) {
          strong.appendChild(p.firstChild);
        }
        textCellFragments.push(strong);
      } else {
        // For CTA or additional <p>, just include as-is (reference, not clone)
        textCellFragments.push(p);
      }
    });
    // If the link is a real link (not modal), wrap text in <a>
    let textCellContent;
    const href = link.getAttribute('href') || '';
    const isModal = link.hasAttribute('data-bs-toggle') || href === '';
    if (!isModal) {
      const a = document.createElement('a');
      a.href = link.href;
      if (link.target) a.target = link.target;
      textCellFragments.forEach(frag => a.appendChild(frag));
      textCellContent = a;
    } else {
      // Just div
      const div = document.createElement('div');
      textCellFragments.forEach(frag => div.appendChild(frag));
      textCellContent = div;
    }
    // Table row is [img, text cell content]
    rows.push([
      img,
      textCellContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
