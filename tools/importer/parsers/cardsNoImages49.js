/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows
  const cells = [];
  // Header row
  cells.push(['Cards (cardsNoImages49)']);

  // Get the two card containers (columns)
  const cols = element.querySelectorAll(':scope > div > div.row > div');

  // First card: News and Updates
  if (cols[0]) {
    // All content together in one div as in the source (heading, ul, button)
    const cardDiv = document.createElement('div');
    const h3 = cols[0].querySelector('h3');
    if (h3) cardDiv.appendChild(h3);
    const ul = cols[0].querySelector('ul');
    if (ul) cardDiv.appendChild(ul);
    const viewMore = cols[0].querySelector('p.text-left');
    if (viewMore) cardDiv.appendChild(viewMore);
    cells.push([cardDiv]);
  }

  // Second card: Managing Director Message
  if (cols[1]) {
    // The link wraps all content and should be preserved
    const a = cols[1].querySelector('a');
    if (a) {
      // Instead of cloning, reference the a directly (which includes all its content)
      cells.push([a]);
    }
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
