/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (exactly as example)
  const headerRow = ['Hero (hero24)'];
  // 2. Background image (optional)
  let bgImg = null;
  // Look for an image inside a div with class 'bg-images', anywhere inside 'element'
  const bgDiv = element.querySelector('.bg-images');
  if (bgDiv) {
    const img = bgDiv.querySelector('img');
    if (img) bgImg = img;
  }
  // 3. Content cell (title, subtitle, CTA)
  const contentCell = [];
  // Title (h1)
  const h1 = element.querySelector('.box-login h1');
  if (h1) contentCell.push(h1);
  // Subtitle (h2)
  const h2 = element.querySelector('.box-login h2');
  if (h2) contentCell.push(h2);
  // CTA: Register link (in .user-registration)
  const userReg = element.querySelector('.user-registration');
  if (userReg) {
    contentCell.push(userReg);
  }
  // 4. Table construction
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length > 0 ? contentCell : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
