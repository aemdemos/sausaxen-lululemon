/* global WebImporter */
export default function parse(element, { document }) {
  // Embed block with all content from the element included as a single cell
  const headerRow = ['Embed'];
  // Reference the entire element so all text and structure is preserved
  const dataRow = [element];
  const cells = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
