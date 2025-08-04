/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main .row containing columns
  const mainRow = element.querySelector('.row');
  if (!mainRow) return;
  const columns = mainRow.querySelectorAll(':scope > div');
  let leftCol = null, rightCol = null;
  columns.forEach(col => {
    if (col.classList.contains('col-lg-8')) leftCol = col;
    if (col.classList.contains('col-lg-4')) rightCol = col;
  });

  // Left column: heading + white card
  let leftContent = null;
  if (leftCol) {
    // Find heading and white card
    const heading = leftCol.querySelector('h4.heading');
    const whiteCard = leftCol.querySelector('.bg-white.border.p-3');
    if (heading && whiteCard) {
      // Wrap in fragment for reference
      const frag = document.createDocumentFragment();
      frag.appendChild(heading);
      frag.appendChild(whiteCard);
      leftContent = frag;
    } else if (heading) {
      leftContent = heading;
    } else if (whiteCard) {
      leftContent = whiteCard;
    } else {
      leftContent = leftCol;
    }
  }

  // Right column: blue box
  let rightContent = null;
  if (rightCol) {
    const blueBox = rightCol.querySelector('.p-4.bg-blue') || rightCol.querySelector('.bg-blue');
    rightContent = blueBox ? blueBox : rightCol;
  }

  // Build the block table as per the example structure
  // Header row: single column, Content row: two columns
  const cells = [
    ['Columns (columns38)'],
    [leftContent, rightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
