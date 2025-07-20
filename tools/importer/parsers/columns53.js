/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate .container > .row inside the section
  const row = element.querySelector('.container > .row');
  if (!row) return;

  // Find all direct child columns
  const cols = Array.from(row.children)
    .filter(col => col.classList.contains('col-lg-3') || col.className.match(/col-\w+-3/));

  // For each, get the direct content container (the card box)
  const cellContents = cols.map(col => {
    // The content box: usually the only or first child
    let box = col.firstElementChild;
    if (!box) box = col;
    return box;
  });

  // Compose the rows for the columns block: header row, then content row
  const cells = [
    ['Columns (columns53)'],
    cellContents,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
