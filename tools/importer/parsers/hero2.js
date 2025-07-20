/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the block name
  const headerRow = ['Hero (hero2)'];

  // 1. Extract the background image (optional)
  let bgImg = '';
  const imgContainer = element.querySelector('.container.text-center.my-3');
  if (imgContainer) {
    const img = imgContainer.querySelector('img');
    if (img) bgImg = img;
  }

  // 2. Extract all headline/subheading/paragraph content
  // There may be more than one (desktop/mobile), but contents are redundant, so take the first block with h1 and p
  let textContent = [];
  // Try desktop first, then mobile
  let textBlock = element.querySelector('.border-l.mb-2.d-none.d-lg-block');
  if (!textBlock) {
    textBlock = element.querySelector('.border-l.mb-2.d-block.d-lg-none');
  }
  if (textBlock) {
    // Only add children if they exist
    textContent = Array.from(textBlock.children).filter(child => child.textContent.trim());
  }
  // Fallback: if nothing found, try any .border-l.mb-2
  if (textContent.length === 0) {
    const fallbackBlock = element.querySelector('.border-l.mb-2');
    if (fallbackBlock) {
      textContent = Array.from(fallbackBlock.children).filter(child => child.textContent.trim());
    }
  }

  // 3. Build the table structure
  const rows = [
    headerRow,
    [bgImg || ''],
    [textContent.length ? textContent : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
