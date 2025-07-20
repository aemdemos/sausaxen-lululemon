/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .container > .row columns
  const row = element.querySelector('.container > .row');
  if (!row) return;
  const columns = Array.from(row.children);
  // Defensive: Only process if at least two columns present
  if (columns.length < 2) return;

  // COLUMN 1: The image column
  const colImg = columns[0];
  let colImgContent = [];
  if (colImg) {
    // Find the main image: img.img-fluid
    const img = colImg.querySelector('img');
    if (img) colImgContent.push(img);
  }

  // COLUMN 2: The text/info column
  const colInfo = columns[1];
  let colInfoContent = [];
  if (colInfo) {
    // 1. The header div (border-left) with h1 and p (Chairman)
    const headerDiv = colInfo.querySelector('.border-left');
    if (headerDiv) colInfoContent.push(headerDiv);

    // 2. The two paragraphs with biography text (class 'mb-3' but NOT in border-left)
    // Only select <p.mb-3> that are directly under colInfo (not in .border-left)
    Array.from(colInfo.querySelectorAll('p.mb-3')).forEach(p => {
      // skip if inside the headerDiv
      if (!headerDiv || !headerDiv.contains(p)) {
        colInfoContent.push(p);
      }
    });
    // 3. The download link (in p.mt-4)
    const downloadP = colInfo.querySelector('p.mt-4');
    if (downloadP) colInfoContent.push(downloadP);
  }

  // Table structure: header row, then one row with two columns
  const cells = [
    ['Columns (columns3)'],
    [colImgContent, colInfoContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
