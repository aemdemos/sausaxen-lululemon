/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name, matching the example exactly
  const headerRow = ['Columns (columns12)'];

  // Get all immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect ALL content (including text nodes, elements, etc.)
  const contentCells = columns.map((col) => {
    const nodes = [];
    col.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IFRAME') {
        // For iframe (not img), add as a link with its src
        const link = document.createElement('a');
        link.href = node.src;
        link.textContent = node.src;
        link.target = '_blank';
        nodes.push(link);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('scroll-socialmedia')) {
        // For .scroll-socialmedia (twitter), add all children
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
            nodes.push(child);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        nodes.push(document.createTextNode(node.textContent));
      }
    });
    // If the column is empty, return empty string
    if (nodes.length === 0) return '';
    // If only one node, return that node; else, return array
    return nodes.length === 1 ? nodes[0] : nodes;
  });

  // Build the table as [headerRow, contentRow], where contentRow has one cell per column
  const rows = [headerRow, contentCells];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
