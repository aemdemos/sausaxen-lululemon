/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .eq-blocks in any tab-pane within the given element
  const eqBlocks = element.querySelectorAll('.eq-blocks');
  const cells = [
    ['Cards (cards39)']
  ];
  eqBlocks.forEach(block => {
    // Get all <p> children
    const ps = Array.from(block.querySelectorAll(':scope > p'));
    if (ps.length === 0) return;
    // First <p> is the title
    const titleP = ps[0];
    // Use the original <p> for the rest (description lines)
    const descPs = ps.slice(1);
    // Make the title a <strong> element (semantic heading for cards)
    const heading = document.createElement('strong');
    heading.textContent = titleP.textContent.trim();
    // Compose the content: heading followed by description lines
    const textCell = [heading, ...descPs];
    // There are no images, so first cell is ''
    cells.push(['', textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
