/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero28) block table: 1 column x 3 rows
  // 1. Header row (exact name)
  const headerRow = ['Hero (hero28)'];

  // 2. Background image (none in the source HTML, so empty string)
  const backgroundRow = [''];

  // 3. Content row: all content from the element must be included (icon + text + link)
  // Place the actual element in the cell to preserve all its content
  const contentRow = [element];

  // Compose the table as per block requirements
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
