/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the block name specification
  const headerRow = ['Hero (hero28)'];

  // Background image row (empty since none is present in given html)
  const imageRow = [''];

  // Content row: ensure all text and child content from the element is included
  // This includes the <a> and any of its children (icon, text)
  const contentRow = [Array.from(element.childNodes)];

  // Compose cells array for createTable
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
