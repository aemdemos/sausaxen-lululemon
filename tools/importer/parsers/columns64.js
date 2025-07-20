/* global WebImporter */
export default function parse(element, { document }) {
  // Find columns: direct children of .row
  const container = element.querySelector('.container');
  if (!container) return;
  const row = container.querySelector('.row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > div');
  if (!cols.length) return;

  // Prepare header: one cell only
  const headerRow = ['Columns (columns64)'];

  // Prepare content row: one cell for each column
  const contentRow = [];
  for (let i = 0; i < cols.length; i += 1) {
    const col = cols[i];
    const box = col.querySelector('.box-block');
    if (i < 2) {
      contentRow.push(box);
    } else {
      // For the third column, also include the 'Media Library' p if present
      const colContent = [];
      if (box) colContent.push(box);
      const mediaLibP = col.querySelector('p.mt-5.my-3.px-4');
      if (mediaLibP) colContent.push(mediaLibP);
      contentRow.push(colContent.length === 1 ? colContent[0] : colContent);
    }
  }

  // Assemble the table as per block guidelines
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
