/* global WebImporter */
export default function parse(element, { document }) {
  // Find the core row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;
  // Get immediate children = columns
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length !== 2) return;

  // Compose table rows: header and content
  // We will create the table and set colspan on the header after creation
  const cells = [
    ['Columns (columns18)'],
    [columns[0], columns[1]]
  ];

  // Build the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header row colspan if there are multiple columns
  const headerRow = block.querySelector('tr');
  if (headerRow && columns.length > 1) {
    const th = headerRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', columns.length);
    }
  }

  // Replace the original element with the table
  element.replaceWith(block);
}
