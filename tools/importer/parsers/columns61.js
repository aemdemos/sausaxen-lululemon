/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel stage that contains the four items
  const container = element.querySelector('.container');
  if (!container) return;
  const stage = container.querySelector('.bootstrape-stage');
  if (!stage) return;
  // Collect all direct children that have the icons and content
  const items = Array.from(stage.querySelectorAll('.bootstrape-item'));

  // Each item will contribute a column
  const columns = items.map(item => {
    const block = item.querySelector('.investor-btm-block');
    if (!block) return document.createTextNode('');
    const frag = document.createElement('div');
    const imgLink = block.querySelector('a');
    if (imgLink) {
      frag.appendChild(imgLink);
    }
    const textP = block.querySelector('p');
    if (textP) {
      frag.appendChild(textP);
    }
    return frag.childNodes.length === 1 ? frag.firstChild : frag;
  });

  // Compose the rows: header (1 cell), then 1 row with N columns
  const rows = [];
  rows.push(['Columns (columns61)']);
  rows.push(columns);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
