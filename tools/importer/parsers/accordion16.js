/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Accordion (accordion16)'];

  // Find the accordion container (prefer #accordion, fallback to first .accordion, fallback to self)
  let accordion = element.querySelector('#accordion');
  if (!accordion) accordion = element.querySelector('.accordion');
  if (!accordion) accordion = element;

  // For each .card in the accordion get title and content
  const cards = accordion.querySelectorAll('.card');
  const rows = [];

  cards.forEach((card) => {
    // TITLE CELL
    let titleNode = card.querySelector('.card-header');
    let titleContent = '';
    if (titleNode) {
      // Prefer .card-title if exists (preserves possible formatting)
      const cardTitle = titleNode.querySelector('.card-title');
      if (cardTitle) {
        titleContent = cardTitle.innerHTML;
      } else {
        titleContent = titleNode.innerHTML;
      }
    }
    // Create an element for the title cell
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = titleContent;

    // CONTENT CELL
    let contentNode = card.querySelector('.card-body');
    let contentDiv = document.createElement('div');
    if (contentNode) {
      // Find all direct children containers OR if not, all children
      const mainContainers = contentNode.querySelectorAll(':scope > .container.mt-4');
      if (mainContainers.length > 0) {
        mainContainers.forEach((c) => {
          // Reference the existing node (not clone)
          contentDiv.appendChild(c);
        });
      } else {
        // If no .container.mt-4 found, include all children
        Array.from(contentNode.childNodes).forEach((n) => {
          // Reference the existing node (not clone)
          contentDiv.appendChild(n);
        });
      }
      // Remove empty wrappers (if no actual content)
      if (!contentDiv.textContent.trim()) {
        contentDiv = document.createElement('div');
      }
    }
    rows.push([titleDiv, contentDiv]);
  });

  // Compose the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
