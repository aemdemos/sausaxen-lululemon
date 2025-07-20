/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the select element (the only 'card' present in this block)
  const select = element.querySelector('select');
  const formGroup = element.querySelector('.form-group');

  // Reference the full form-group (containing the select)
  // This preserves all text and structure, and is robust for minor variations
  let cardContent = formGroup || select || element;

  // Assemble the cells array per block structure
  const cells = [
    ['Cards (cards6)'],
    [cardContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}