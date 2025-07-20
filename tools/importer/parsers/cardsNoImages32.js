/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name - matches example exactly
  const headerRow = ['Cards (cardsNoImages32)'];
  const cells = [headerRow];

  // Find all direct card rows
  const cardRows = element.querySelectorAll('section .container > .row.bg-white');

  cardRows.forEach((cardRow) => {
    // Extract the left cell (title/label)
    const left = cardRow.querySelector('.col-md-9');
    // Extract the right cell (CTA link)
    const right = cardRow.querySelector('.col-md-3 a');

    // Build the card content for the cell
    const fragments = [];
    if (left) {
      // Use the first <a> tag in the left as heading if possible, otherwise use text node
      const maybeLink = left.querySelector('a');
      if (maybeLink) {
        // For consistency, use <strong> for heading as in example (or <b>)
        const strong = document.createElement('strong');
        strong.textContent = maybeLink.textContent.trim();
        fragments.push(strong);
      } else {
        const text = left.textContent.trim();
        if (text) {
          const strong = document.createElement('strong');
          strong.textContent = text;
          fragments.push(strong);
        }
      }
    }
    // If there's a CTA link, put it below the heading as in the example, as a link
    if (right) {
      // Add a <br> for separation only if there's a heading
      if (fragments.length) {
        fragments.push(document.createElement('br'));
      }
      fragments.push(right);
    }
    // Only add row if something exists
    if (fragments.length) {
      cells.push([fragments]);
    }
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
