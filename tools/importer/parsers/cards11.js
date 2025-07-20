/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all tab names from <li> elements, robust for missing classes.
  const items = element.querySelectorAll(':scope > li, .nav-item');
  // Build content rows: [image, text] (no image, so image cell empty)
  const rows = Array.from(items).map(li => {
    const a = li.querySelector('a');
    const label = a ? a.textContent.trim() : li.textContent.trim();
    return ['', label];
  });

  // Create table
  const table = document.createElement('table');
  // Header row with single th spanning two columns
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', '2');
  th.textContent = 'Cards (cards11)';
  headerTr.appendChild(th);
  table.appendChild(headerTr);
  // Content rows
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  element.replaceWith(table);
}