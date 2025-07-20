/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .container > .row children (columns)
  const row = element.querySelector('.container .row');
  if (!row) return;
  const cols = Array.from(row.children);
  if (cols.length < 2) return;

  // Left column: image
  const leftCol = cols[0];
  const img = leftCol.querySelector('img');

  // Right column: structured content
  const rightCol = cols[1];
  const contentElements = [];

  // Name and title block (.border-left)
  const nameBlock = rightCol.querySelector('.border-left');
  if (nameBlock) contentElements.push(nameBlock);
  
  // Social icons (.social-icons ul)
  const socialIcons = rightCol.querySelector('.social-icons');
  if (socialIcons) contentElements.push(socialIcons);

  // Main description (first p.mb-3)
  const descP = rightCol.querySelector('p.mb-3');
  if (descP) contentElements.push(descP);

  // Download high resolution image (p.mt-4)
  const downloadP = rightCol.querySelector('p.mt-4');
  if (downloadP) contentElements.push(downloadP);

  // Compose table rows
  const headerRow = ['Columns (columns59)'];
  const contentRow = [img, contentElements];
  
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
