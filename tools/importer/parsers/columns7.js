/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name, exactly one column
  const headerRow = ['Columns (columns7)'];

  // 2. Get heading as a full-width row (its own row)
  const heading = element.querySelector('h2');
  let headingRow = [];
  if (heading) {
    headingRow = [heading]; // single cell row, heading referenced directly
  }

  // 3. Gather all columns (immediate children of .row)
  const row = element.querySelector('.row');
  let colDivs = [];
  if (row) {
    colDivs = Array.from(row.children);
  }

  // 4. Reference <a> for each column's content
  const columnContent = colDivs.map(div => {
    const link = div.querySelector('a');
    if (link) return link;
    return div.textContent.trim();
  });

  // 5. Group columns into rows of 3 columns per row
  const columnsInRow = 3;
  const columnRows = [];
  for (let i = 0; i < columnContent.length; i += columnsInRow) {
    const rowArr = columnContent.slice(i, i + columnsInRow);
    while (rowArr.length < columnsInRow) rowArr.push('');
    columnRows.push(rowArr);
  }

  // 6. Compose final block: header, heading, columns
  const cells = [headerRow];
  if (headingRow.length) cells.push(headingRow);
  columnRows.forEach(r => cells.push(r));

  // 7. Replace element with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
