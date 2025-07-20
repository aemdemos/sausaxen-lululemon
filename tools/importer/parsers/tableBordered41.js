/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tables with proper class
  const tables = element.querySelectorAll('table.table-bordered, table.bordered');
  if (!tables || tables.length === 0) return;

  tables.forEach((tbl) => {
    const cells = [];
    // First row: Block table header row, single column
    cells.push(['Table (bordered)']);

    // Second row: block table header row, single cell containing the header row of the source table
    const thead = tbl.querySelector('thead');
    let blockHeaderTable = document.createElement('table');
    let blockHeaderTr = document.createElement('tr');
    if (thead) {
      const ths = thead.querySelectorAll('th');
      ths.forEach((th) => {
        const thEl = document.createElement('th');
        Array.from(th.childNodes).forEach((node) => thEl.appendChild(node.cloneNode(true)));
        blockHeaderTr.appendChild(thEl);
      });
    }
    blockHeaderTable.appendChild(blockHeaderTr);
    cells.push([blockHeaderTable]);

    // Each data row: single block table cell containing a row from the source table
    const tbody = tbl.querySelector('tbody');
    if (tbody) {
      Array.from(tbody.querySelectorAll('tr')).forEach((srcTr) => {
        const rowTable = document.createElement('table');
        const rowTr = document.createElement('tr');
        Array.from(srcTr.querySelectorAll('td')).forEach((td) => {
          const tdEl = document.createElement('td');
          Array.from(td.childNodes).forEach((node) => tdEl.appendChild(node.cloneNode(true)));
          rowTr.appendChild(tdEl);
        });
        rowTable.appendChild(rowTr);
        cells.push([rowTable]);
      });
    }

    // Replace original table with the new block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    tbl.replaceWith(block);
  });
}
