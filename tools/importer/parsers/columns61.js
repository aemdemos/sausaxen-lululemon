/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel container
  const carousel = element.querySelector('.container .bootstrape-carousel');
  if (!carousel) return;

  // Get all carousel items that are direct children in the stage
  const items = Array.from(carousel.querySelectorAll('.bootstrape-stage .bootstrape-item'));
  if (!items.length) return;

  // Extract the .investor-btm-block from each, reference directly
  const cells = items.map((item) => {
    const block = item.querySelector('.investor-btm-block');
    return block || item;
  });

  // Compose the table as per block structure
  const tableCells = [
    ['Columns (columns61)'], // header row: exactly one cell
    cells // second row: as many columns as items
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
