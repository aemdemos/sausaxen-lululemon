/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Build a cell by collecting all direct child nodes, including text and elements, and for modals, add the video link
  function extractCellContent(parent) {
    const cell = [];
    // Collect all immediate children
    Array.from(parent.childNodes).forEach(child => {
      // If it's a modal, grab the video link from its iframe (and any visible fallback text)
      if (
        child.nodeType === Node.ELEMENT_NODE &&
        child.classList.contains('modal')
      ) {
        const iframe = child.querySelector('iframe');
        if (iframe && iframe.src) {
          const a = document.createElement('a');
          a.href = iframe.src;
          a.textContent = 'Watch Video';
          a.target = '_blank';
          cell.push(a);
        }
      } else {
        // For other nodes, include as-is for text and element content
        cell.push(child);
      }
    });
    // If cell is empty (no content), return empty string so table cells aren't empty element wrappers
    return cell.length ? cell : '';
  }

  // Top-level layout: .col-md-6 (left and right columns)
  const colNodes = element.querySelectorAll(':scope > .col-md-6');
  if (colNodes.length < 2) return;

  // LEFT: Large video section
  const leftCell = extractCellContent(colNodes[0]);

  // RIGHT: 2x2 grid videos (flatten to 4 cells)
  const rightGridParent = colNodes[1];
  const miniCols = rightGridParent.querySelectorAll(':scope > .row > .col-lg-6');
  const rightCells = Array.from(miniCols).map(extractCellContent);
  // Fill up to 4 cells to ensure grid, pad with '' if not enough
  while (rightCells.length < 4) rightCells.push('');

  // Build table: header is single cell with block name, then two rows of three columns each
  const headerRow = ['Columns (columns33)'];
  // Row 1: left + right top row of 2
  const firstRow = [leftCell, rightCells[0], rightCells[1]];
  // Row 2: left empty, right bottom row of 2
  const secondRow = ['', rightCells[2], rightCells[3]];
  const cells = [headerRow, firstRow, secondRow];

  // Create table and set header colspan to match three columns
  const table = WebImporter.DOMUtils.createTable(cells, document);
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', '3');

  element.replaceWith(table);
}
