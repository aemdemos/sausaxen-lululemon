/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row per block requirements
  const headerRow = ['Columns (columns27)'];
  // Each .tab-pane is a block section with two columns
  const tabPanes = element.querySelectorAll(':scope > .tab-pane');
  tabPanes.forEach(tabPane => {
    // Each .tab-pane should contain a .row with two columns (left, right)
    const row = tabPane.querySelector('.row');
    if (!row) return;
    // Get the two immediate column divs (flexible selection)
    const colDivs = Array.from(row.children).filter(c => c.tagName === 'DIV');
    // Prepare left and right column content
    function extractContent(colDiv) {
      if (!colDiv) return '';
      // Get all non-empty nodes in this column
      const nodes = Array.from(colDiv.childNodes).filter(node => {
        // Remove empty text nodes
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
      // Return all nodes (array or string)
      if (nodes.length === 1) return nodes[0];
      if (nodes.length > 1) return nodes;
      return '';
    }
    // Always provide two cells (even if right column is missing)
    const leftContent = extractContent(colDivs[0]);
    const rightContent = extractContent(colDivs[1]);
    // Only build table if there's at least one non-empty cell
    if ((leftContent && typeof leftContent === 'string' ? leftContent.trim() : true) ||
        (rightContent && typeof rightContent === 'string' ? rightContent.trim() : true)) {
      const table = WebImporter.DOMUtils.createTable([
        headerRow,
        [leftContent, rightContent]
      ], document);
      tabPane.replaceWith(table);
    }
  });
  // Remove the original element if it's still present
  if (element.parentElement && element.parentElement.contains(element)) {
    element.remove();
  }
}
