/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per spec
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // Get all immediate child divs that are cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.directors-tile'));

  cardDivs.forEach(cardDiv => {
    // Each .directors-tile contains an <a> with a .card
    const anchor = cardDiv.querySelector('a');
    const card = anchor ? anchor.querySelector('.card') : null;
    if (!card) return; // skip if card is missing
    
    // The image is in .b-o-director > img
    const imgWrap = card.querySelector('.b-o-director');
    const img = imgWrap ? imgWrap.querySelector('img') : null;
    
    // The card body contains name and title
    const body = card.querySelector('.card-body');
    if (!img || !body) return;
    
    // Find the title/name (h4.card-title) and description (p.card-text)
    const title = body.querySelector('.card-title') || body.querySelector('h4');
    const desc = body.querySelector('.card-text') || body.querySelector('p');
    
    // Build text cell: keep elements, not text or cloned elements
    const cellText = [];
    if (title) cellText.push(title);
    if (desc) cellText.push(desc);
    
    rows.push([
      img,
      cellText
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
