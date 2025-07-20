/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .boxzoom element containing the actual content
  const contentBox = element.querySelector('.boxzoom');
  if (!contentBox) return;

  // Extract all meaningful child nodes (skip empty text nodes)
  const cellContent = Array.from(contentBox.childNodes).filter(node => {
    // Keep all non-empty text nodes and elements
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim() !== '';
    }
    return true;
  });

  // Define block table header per requirements
  const headerRow = ['Columns (columns57)'];
  // Second row: all content in a single column (single cell)
  const contentRow = [cellContent];
  const cells = [headerRow, contentRow];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
