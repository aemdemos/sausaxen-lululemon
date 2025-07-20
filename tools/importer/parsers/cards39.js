/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards39)'];
  const rows = [];

  // Collect all tab-pane elements (each block of cards by category)
  const tabPanes = element.querySelectorAll(':scope > .tab-pane');

  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a .row.p-4.bg-gray that wraps columns
    const cardsRow = tabPane.querySelector(':scope > .row.bg-gray');
    if (!cardsRow) return;
    // Find all card columns (handle both .col-lg-3 and .col-md-4)
    const cardCols = cardsRow.querySelectorAll(':scope > div[class*=col-]');
    cardCols.forEach((col) => {
      // The card content is inside .eq-blocks
      const eqBlock = col.querySelector(':scope > .eq-blocks');
      if (!eqBlock) return;
      // For cards39, these are text-only cards: header in first <p>, details in subsequent <p>
      // - First <p>: Title (make strong)
      // - Rest: add as text (line breaks)
      const paragraphs = eqBlock.querySelectorAll('p');
      if (!paragraphs.length) return;
      // Build the card text content
      const contentDiv = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = paragraphs[0].textContent;
      contentDiv.appendChild(title);
      // Add <br> after title if there are more lines
      if (paragraphs.length > 1) {
        contentDiv.appendChild(document.createElement('br'));
      }
      for (let i = 1; i < paragraphs.length; i++) {
        contentDiv.appendChild(document.createTextNode(paragraphs[i].textContent));
        if (i < paragraphs.length - 1) {
          contentDiv.appendChild(document.createElement('br'));
        }
      }
      // For this set, there are no images, so first column is blank
      rows.push(['', contentDiv]);
    });
  });

  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
    element.replaceWith(table);
  }
}
