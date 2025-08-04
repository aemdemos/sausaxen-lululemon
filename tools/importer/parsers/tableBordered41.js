/* global WebImporter */
export default function parse(element, { document }) {
  // Find all relevant bordered tables for the block
  const tables = element.querySelectorAll('table.table-bordered');
  tables.forEach((foundTable) => {
    const cells = [];
    // 1. First row: block header
    cells.push(['Table (bordered)']);

    // 2. Header row: as an array of strings
    const theadTr = foundTable.querySelector('thead tr');
    if (theadTr) {
      const headerCells = Array.from(theadTr.children).map(th => th.textContent.trim());
      cells.push(headerCells);
    }

    // 3. Data rows: for each row, push an array of the *contents* of each <td>, not the <td> itself
    const bodyRows = foundTable.querySelectorAll('tbody tr');
    bodyRows.forEach((tr) => {
      const rowCells = Array.from(tr.children).map(td => {
        // If td is empty
        if (!td.hasChildNodes()) return '';
        // If td contains only one element, return it
        if (td.childElementCount === 1 && td.children.length === 1) {
          return td.children[0];
        }
        // If td contains multiple child nodes, return an array of those nodes
        if (td.childNodes.length > 1) {
          return Array.from(td.childNodes);
        }
        // If td contains only one text node
        if (td.childNodes.length === 1 && td.childNodes[0].nodeType === Node.TEXT_NODE) {
          return td.textContent.trim();
        }
        // fallback: all nodes
        return Array.from(td.childNodes);
      });
      cells.push(rowCells);
    });

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    // Replace the old table with the block
    foundTable.replaceWith(block);
  });
}
