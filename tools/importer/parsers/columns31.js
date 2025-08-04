/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row exactly as required
  const headerRow = ['Columns (columns31)'];

  // Find the row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // ---- COLUMN 1 extraction ----
  // (Image)
  // The image is nested inside: .slideItem.gallery-main-img > .video-section1 > img
  let col1Img = cols[0].querySelector('img');
  let col1Content = [];
  if (col1Img) {
    col1Content.push(col1Img);
  }

  // ---- COLUMN 2 extraction ----
  // (Heading, paragraphs, link)
  // All content is inside .video-content
  const col2Content = [];
  const col2ContentDiv = cols[1].querySelector('.video-content');
  if (col2ContentDiv) {
    // Reference all <h3>, <p> and <a> in order
    Array.from(col2ContentDiv.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        col2Content.push(node);
      }
    });
  }

  // Build the cells array for the block
  const cells = [
    headerRow,
    [col1Content, col2Content]
  ];

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}