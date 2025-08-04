/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the row containing the columns
  const row = element.querySelector('.row');
  let columns = [];
  if (row) {
    const colDivs = Array.from(row.children);
    columns = colDivs.map(col => {
      let contentDiv = col.querySelector('.bg-white, .boxzoom');
      if (!contentDiv) contentDiv = col;
      return contentDiv;
    });
  }
  if (columns.length === 0) {
    columns = [''];
  }

  // Table cells: header and content row
  const cells = [
    ['Columns (columns62)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row's colspan to match the number of columns (critical fix)
  const allRows = table.querySelectorAll('tr');
  const headerRow = allRows[0];
  const dataRow = allRows[1];
  if (
    headerRow &&
    headerRow.children.length === 1 &&
    dataRow &&
    dataRow.children.length > 1
  ) {
    headerRow.children[0].setAttribute('colspan', dataRow.children.length);
  }

  element.replaceWith(table);
}
