/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row in the section
  const row = element.querySelector('.row');
  if (!row) return;

  // Get immediate column divs
  const columns = row.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // col1: image
  const col1 = columns[0];
  const img = col1.querySelector('img');
  const col1Content = img ? [img] : [];

  // col2: title, subtitle, text, download link
  const col2 = columns[1];
  const col2Content = [];

  // Title and subtitle
  const borderLeft = col2.querySelector('.border-left');
  if (borderLeft) {
    col2Content.push(borderLeft);
  }

  // Description paragraphs (excluding download link)
  const descParagraphs = col2.querySelectorAll('p.mb-3');
  descParagraphs.forEach(p => col2Content.push(p));

  // Download link (in its own p, if exists)
  const downloadP = col2.querySelector('p.mt-4');
  if (downloadP) {
    col2Content.push(downloadP);
  }

  // Header row: two columns, first cell has text, second is empty (matches example structure)
  const headerRow = ['Columns (columns3)', ''];
  const bodyRow = [col1Content, col2Content];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  // Replace original section with the block
  element.replaceWith(table);
}
