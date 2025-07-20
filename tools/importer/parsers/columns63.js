/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Columns (columns63)'];

  // Find all the columns (each .col-md-4 is a column cell)
  const rowDiv = element.querySelector('.row');
  const cols = Array.from(rowDiv ? rowDiv.querySelectorAll(':scope > .col-md-4') : []);

  // Group into rows of 3 columns, as in visual layout
  const cellsPerRow = 3;
  const dataRows = [];
  for (let i = 0; i < cols.length; i += cellsPerRow) {
    const group = cols.slice(i, i + cellsPerRow);
    const row = group.map(col => {
      // Use the actual <a> element, not a clone
      const link = col.querySelector('a');
      if (link) {
        // To keep the link text, but not the inner div, create a new anchor reusing the same href
        // But instead, we can create a new <a> and reference the original <p> for semantic meaning
        const p = link.querySelector('p');
        if (p) {
          // Create a new <a> and reuse the original <p> for text
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = p.textContent;
          return a;
        } else {
          return link;
        }
      }
      // If no link, just use the text
      return col.textContent.trim();
    });
    dataRows.push(row);
  }

  // Create the table
  const cells = [headerRow, ...dataRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
