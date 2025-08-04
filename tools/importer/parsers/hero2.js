/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the background image (from the last .container with text-center and my-3)
  let backgroundImg = '';
  const bgImgDiv = element.querySelector('.container.text-center.my-3');
  if (bgImgDiv) {
    const img = bgImgDiv.querySelector('img');
    if (img) backgroundImg = img;
  }

  // 2. Extract headline, subheading, and paragraph
  // Use the first border-l block present (desktop or mobile)
  let contentDiv = element.querySelector('.border-l.mb-2');
  if (!contentDiv) {
    // fallback: try any .border-l
    contentDiv = element.querySelector('.border-l');
  }

  // Fallback: search for h1 and p in the main .container if not found
  let contentElements = [];
  if (contentDiv) {
    for (const child of contentDiv.children) {
      contentElements.push(child);
    }
  } else {
    const mainContainer = element.querySelector('.container');
    if (mainContainer) {
      contentElements = Array.from(mainContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
    }
  }

  // 3. Compose the block table according to instructions: 1 col, 3 rows
  const cells = [
    ['Hero (hero2)'],
    [backgroundImg ? backgroundImg : ''],
    [contentElements.length ? contentElements : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
