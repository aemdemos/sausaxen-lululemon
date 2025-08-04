/* global WebImporter */
export default function parse(element, { document }) {
  const boxPd = element.querySelector('.boxPd');
  if (!boxPd) return;

  const heading = boxPd.querySelector('h3');
  const row = boxPd.querySelector('.row');
  if (!row) return;

  const columns = Array.from(row.children).filter(col => col.matches('[class*=col-]'));

  let leftCellContent = [];
  let rightCellContent = [];

  if (columns[0]) {
    const col1 = columns[0];
    const ul = col1.querySelector('ul');
    if (ul) leftCellContent.push(ul);
  }
  if (heading) {
    leftCellContent.unshift(heading);
  }
  if (columns[1]) {
    const col2 = columns[1];
    const img = col2.querySelector('img');
    if (img) rightCellContent.push(img);
  }
  if (leftCellContent.length === 0) leftCellContent = [''];
  if (rightCellContent.length === 0) rightCellContent = [''];

  // Create the table with the intended rows
  const cells = [
    ['Columns (columns23)'],
    [leftCellContent, rightCellContent]
  ];

  // Use the helper to create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Ensure the header row has one cell spanning both columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1 && table.rows[1] && table.rows[1].cells.length === 2) {
    headerTr.children[0].setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
