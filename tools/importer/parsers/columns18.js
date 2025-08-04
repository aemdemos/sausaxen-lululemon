/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .row.bg-white block containing the two columns
  const contentRow = element.querySelector('.row.bg-white');
  if (!contentRow) return;

  // Get the two columns
  const colDivs = contentRow.querySelectorAll(':scope > div');
  if (colDivs.length !== 2) return;

  // Left column: contains a <a> with the title (not a link)
  const leftCol = colDivs[0];
  let leftContent = null;
  // Find the <a> child (should be present)
  const leftA = leftCol.querySelector('a');
  if (leftA && leftA.textContent.trim()) {
    // Use a <p> to retain semantic paragraph
    const p = document.createElement('p');
    p.textContent = leftA.textContent.trim();
    leftContent = p;
  } else if (leftCol.textContent.trim()) {
    // Fallback: just a paragraph with the text
    const p = document.createElement('p');
    p.textContent = leftCol.textContent.trim();
    leftContent = p;
  } else {
    leftContent = document.createTextNode('');
  }

  // Right column: contains a link styled as a button
  const rightCol = colDivs[1];
  let rightContent = null;
  const rightA = rightCol.querySelector('a[href]');
  if (rightA && rightA.textContent.trim()) {
    // Create a clean link (not a button)
    const link = document.createElement('a');
    link.href = rightA.getAttribute('href');
    link.textContent = rightA.textContent.trim();
    if (rightA.hasAttribute('target')) link.setAttribute('target', rightA.getAttribute('target'));
    if (rightA.hasAttribute('rel')) link.setAttribute('rel', rightA.getAttribute('rel'));
    rightContent = link;
  } else {
    rightContent = document.createTextNode('');
  }

  // Correct header: exactly one column
  const cells = [
    ['Columns (columns18)'], // header row: one column only
    [leftContent, rightContent] // content row: as many columns as needed
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
