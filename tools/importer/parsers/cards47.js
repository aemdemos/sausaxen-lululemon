/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get the first <img> in a root
  function getFirstImage(root) {
    return root.querySelector('img');
  }
  // Helper: Gather all text content for a card
  function getCardText(root) {
    const frag = document.createDocumentFragment();
    // title
    let heading = root.querySelector('h3, .sectionheading');
    if (heading) frag.append(heading);
    // description p(s)
    root.querySelectorAll(':scope > p').forEach(p => frag.append(p));
    return frag;
  }
  const headerRow = ['Cards (cards47)'];
  const rowsArr = [];
  // Card 1 (Adani Foundation)
  const card1Row = element.querySelector('.row.no-gutters.mb-3');
  if (card1Row) {
    const cols = card1Row.querySelectorAll(':scope > div');
    if (cols.length >= 2) {
      const imgCell = cols[0];
      const textCell = cols[1].querySelector('.bg-white');
      const img = getFirstImage(imgCell);
      const text = textCell ? getCardText(textCell) : null;
      if (img && text) rowsArr.push([img, text]);
    }
  }
  // Card 2 (Conserving the Coastal Ecology)
  const col4 = element.querySelector('.col-lg-4');
  if (col4) {
    const card2Row = col4.querySelector('.row.no-gutters');
    if (card2Row) {
      const cols = card2Row.querySelectorAll(':scope > div');
      if (cols.length >= 2) {
        const imgCell = cols[0];
        const textCell = cols[1].querySelector('.bg-white');
        const img = getFirstImage(imgCell);
        const text = textCell ? getCardText(textCell) : null;
        if (img && text) rowsArr.push([img, text]);
      }
    }
  }
  if (rowsArr.length) {
    const cells = [headerRow, ...rowsArr];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
