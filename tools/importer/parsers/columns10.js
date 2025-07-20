/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Create the header row with exactly one column (matches the example)
  const cells = [ ['Columns (columns10)'] ];

  // Add a single row with all column content, each as its own cell
  const row = columns.map(col => {
    // Collect all children (including text nodes)
    const frag = document.createElement('div');
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        frag.appendChild(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        frag.appendChild(document.createTextNode(node.textContent));
      }
    });
    // If the column is empty, return an empty string
    if (!frag.childNodes.length) return '';
    // If only one child and it's a single element, return it directly
    if (frag.childNodes.length === 1) return frag.firstChild;
    // Otherwise, return the fragment (which may contain several elements/texts)
    return Array.from(frag.childNodes);
  });

  cells.push(row);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
