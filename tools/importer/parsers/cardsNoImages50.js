/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name and variant exactly
  const cells = [['Cards (cardsNoImages50)']];

  // Find the card container row
  const row = element.querySelector('.row');
  if (row) {
    // Select all immediate children (each card column)
    const cardColumns = row.querySelectorAll(':scope > div');
    cardColumns.forEach((col) => {
      // Each card is structured as: <a><div><p>Text</p></div></a>
      const link = col.querySelector('a');
      if (link) {
        // Find the .tariff-block (contains the text)
        const block = link.querySelector('.tariff-block');
        if (block) {
          // Check for <p>, otherwise fallback to textContent
          const p = block.querySelector('p');
          if (p) {
            // Create a link element referencing the original <a>, but reuse existing <p>
            // (Don't clone, instead move the <p> node into the <a> node)
            // Remove all children from link
            while (link.firstChild) link.removeChild(link.firstChild);
            // Append the <p> directly into the link
            link.appendChild(p);
            cells.push([link]);
          } else {
            // If only text, set link's textContent
            link.textContent = block.textContent.trim();
            cells.push([link]);
          }
        } else {
          // If structure unexpected, use link as fallback
          cells.push([link]);
        }
      } else {
        // Fallback: if no link, use the card column text
        const text = col.textContent && col.textContent.trim();
        if (text) {
          cells.push([text]);
        }
      }
    });
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
