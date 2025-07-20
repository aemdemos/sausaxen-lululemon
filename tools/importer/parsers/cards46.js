/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards46)'];
  const rows = [];
  // Select the card columns (section > .container > .row > [card cols])
  const cardCols = element.querySelectorAll('.container > .row > div');
  cardCols.forEach((col) => {
    // Each col contains an <a> with .chairman-box inside
    const anchor = col.querySelector('a');
    if (!anchor) return;
    const cardBox = anchor.querySelector('.chairman-box');
    if (!cardBox) return;
    // Text column: .col-md-8
    const textCol = cardBox.querySelector('.col-md-8');
    // Image column: .col-md-4
    const imgCol = cardBox.querySelector('.col-md-4');
    // Image (always first cell)
    let img = imgCol ? imgCol.querySelector('img') : null;
    // Compose content for right cell
    const rightCell = [];
    if (textCol) {
      // Title
      const h3 = textCol.querySelector('h3');
      if (h3) rightCell.push(h3);
      // Description
      const h4 = textCol.querySelector('h4');
      if (h4) rightCell.push(h4);
      // Read more (as a link, using anchor href)
      const readMore = textCol.querySelector('p.readmore');
      if (readMore && anchor.getAttribute('href')) {
        const link = document.createElement('a');
        link.href = anchor.getAttribute('href');
        link.textContent = readMore.textContent.trim();
        rightCell.push(link);
      }
      // Signature (Name and sub-title)
      const signature = textCol.querySelector('p.signature');
      if (signature) rightCell.push(signature);
    }
    // Only add row if image and at least one text content
    if (img && rightCell.length > 0) {
      rows.push([img, rightCell]);
    }
  });
  // Compose table data
  const tableData = [headerRow, ...rows];
  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
