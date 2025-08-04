/* global WebImporter */
export default function parse(element, { document }) {
  // Find the three main columns inside the .row
  const row = element.querySelector('.row');
  if (!row) return;
  const columns = Array.from(row.children);

  function getBoxBlock(colDiv) {
    return colDiv.querySelector(':scope > .box-block');
  }

  function getMediaLibrary(colDiv) {
    return colDiv.querySelector('p.mt-5.my-3.px-4');
  }

  // Prepare columns content for the main row
  const col1 = columns[0] ? getBoxBlock(columns[0]) || document.createTextNode('') : document.createTextNode('');
  const col2 = columns[1] ? getBoxBlock(columns[1]) || document.createTextNode('') : document.createTextNode('');

  let col3 = '';
  let mediaLib = '';
  if (columns[2]) {
    // Only put the box-block (Media Contacts) in the third column for the 2nd row
    col3 = getBoxBlock(columns[2]) || document.createTextNode('');
    // Media Library should go in its own row according to the spec
    const ml = getMediaLibrary(columns[2]);
    if (ml) {
      mediaLib = ml;
    }
  } else {
    col3 = document.createTextNode('');
  }

  // Build the cells array: header, then row of columns, then (if present) Media Library as a new row
  const cells = [
    ['Columns (columns64)'],
    [col1, col2, col3]
  ];
  // Only add a new row for Media Library if it exists, in third cell only
  if (mediaLib) {
    cells.push(['', '', mediaLib]);
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
