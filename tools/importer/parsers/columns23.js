/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .boxPd inside the editorBox
  const boxPd = element.querySelector('.boxPd');
  if (!boxPd) return;

  // Find the heading (h3) -- not part of columns block, so we'll exclude it
  // All content after h3 and br is the row
  const row = boxPd.querySelector('.row');
  if (!row) return;

  // Get all direct children (columns) of row
  const columns = Array.from(row.children);

  // If there are no columns, do not proceed
  if (columns.length === 0) return;

  // Prepare the header row exactly as required
  const headerRow = ['Columns (columns23)'];

  // Prepare the columns row: use the full existing col-md-* elements as-is
  const columnsRow = columns;

  // Build the table
  const cells = [
    headerRow,
    columnsRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
