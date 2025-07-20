/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main row containing the two columns
  const mainRow = element.querySelector('.container > .row');
  if (!mainRow) return;

  const colLeft = mainRow.querySelector('.col-lg-8');
  const colRight = mainRow.querySelector('.col-lg-4');

  // Compose left cell: heading and info table card
  let leftCellContent = [];
  if (colLeft) {
    const heading = colLeft.querySelector('h4.heading');
    if (heading) leftCellContent.push(heading);
    const infoBox = colLeft.querySelector('.bg-white.border.p-3');
    if (infoBox) leftCellContent.push(infoBox);
  }

  // Compose right cell: blue box with latest links
  let rightCellContent = [];
  if (colRight) {
    const blueBox = colRight.querySelector('.p-4.bg-blue.h-100.ul-financials');
    if (blueBox) rightCellContent.push(blueBox);
  }

  // Ensure the header row contains only one column, regardless of the number of content columns
  const cells = [
    ['Columns (columns38)'],
    [leftCellContent, rightCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
