/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first direct child with a selector
  function getDirectChild(parent, selector) {
    for (const child of parent.children) {
      if (child.matches && child.matches(selector)) {
        return child;
      }
    }
    return null;
  }

  // Gather column content in correct order
  const columns = [];

  // 1st column: .ft-submenu
  const col1 = getDirectChild(element, '.ft-submenu');
  if (col1) {
    // The .ft-business <ul> contains the links as <h5><li>...</li></h5>
    const ul = col1.querySelector('ul.ft-business');
    if (ul) {
      columns.push(ul);
    } else {
      columns.push(col1);
    }
  }

  // 2nd column: .col-md-3.col-6:not(.ft-submenu)
  let col2 = null;
  for (const child of element.children) {
    if (
      child.classList &&
      child.classList.contains('col-md-3') &&
      child.classList.contains('col-6') &&
      !child.classList.contains('ft-submenu')
    ) {
      col2 = child;
      break;
    }
  }
  if (col2) {
    columns.push(col2);
  }

  // 3rd column: .col-md-2.col-6
  const col3 = getDirectChild(element, '.col-md-2.col-6');
  if (col3) {
    // The content is in a div inside
    const innerDiv = col3.querySelector('div');
    if (innerDiv) {
      columns.push(innerDiv);
    } else {
      columns.push(col3);
    }
  }

  // 4th column: .col-md-4
  const col4 = getDirectChild(element, '.col-md-4');
  if (col4) {
    columns.push(col4);
  }

  // If any missing, pad with empty
  while (columns.length < 4) columns.push('');

  // Header row must be a single cell
  const headerRow = ['Columns (columns10)'];

  const table = WebImporter.DOMUtils.createTable(
    [headerRow, columns],
    document
  );
  element.replaceWith(table);
}
