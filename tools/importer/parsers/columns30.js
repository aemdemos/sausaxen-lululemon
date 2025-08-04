/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all visible tab-pane sections (each corresponds to a "row" of the Columns block)
  const panes = Array.from(element.querySelectorAll(':scope > .tab-pane'));
  if (!panes.length) return;

  // For each pane, prepare a row with two columns
  const contentRows = [];
  let maxCols = 2;
  panes.forEach((pane) => {
    // Find the .row container in this pane
    const row = pane.querySelector('.row');
    if (!row) return;
    const rowCols = Array.from(row.querySelectorAll(':scope > div'));
    if (rowCols.length < 2) return; // We expect two columns: text and image

    // Find left (text) col and right (image) col
    let leftCol = rowCols.find(c => c.classList.contains('col-md-7'));
    let rightCol = rowCols.find(c => c.classList.contains('col-md-5'));
    if (!leftCol) leftCol = rowCols[0];
    if (!rightCol) rightCol = rowCols[1];

    // Gather content for left column
    const leftContent = [];
    Array.from(leftCol.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          node.matches('h1,h2,h3,h4,h5,h6,p,ul,ol,li') &&
          node.textContent.trim().length > 0
        ) {
          leftContent.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        leftContent.push(span);
      }
    });

    // Gather image for right column
    const carouselImg = rightCol.querySelector('img');
    let rightContent = [];
    if (carouselImg) {
      rightContent.push(carouselImg);
    }
    contentRows.push([
      leftContent.length === 1 ? leftContent[0] : leftContent,
      rightContent.length === 1 ? rightContent[0] : rightContent
    ]);
  });

  // Now build the cells array with header row (ONE cell!) and all content rows (each with two cells)
  const cells = [
    ['Columns (columns30)'] // one cell header row, should span all columns in rendering
  ];
  cells.push(...contentRows);

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(blockTable);
}
