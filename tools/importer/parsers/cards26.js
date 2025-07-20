/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block header row must be a SINGLE cell (one column)
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Select bars list (cards)
  const barsUl = element.querySelector('#bars');
  if (!barsUl) {
    element.replaceWith(WebImporter.DOMUtils.createTable(rows, document));
    return;
  }
  // Each li = one card
  const cards = barsUl.querySelectorAll(':scope > li');

  cards.forEach((cardLi) => {
    // First cell: the percentage visual (acts as icon/image in card)
    let percentText = '';
    const barDiv = cardLi.querySelector('.bar');
    if (barDiv) {
      const percentEm = barDiv.querySelector('em');
      percentText = percentEm ? percentEm.textContent.trim() : '';
    }
    // Use a visually strong span for percent value (icon stand-in)
    // Use the actual element from the doc if possible for semantic fidelity
    let iconElem;
    if (barDiv && barDiv.parentElement) {
      // Use the full .bar (with the <em> inside)
      iconElem = barDiv;
    } else {
      iconElem = document.createElement('span');
      iconElem.textContent = percentText;
    }

    // Second cell: text content (heading + description)
    // Heading is the label (e.g. '< 1 Year')
    let labelText = '';
    const spans = cardLi.querySelectorAll('span');
    // Get the last span inside the li, which is the label
    if (spans.length > 0) {
      labelText = spans[spans.length-1].textContent.trim();
    }
    // Description: express the percentage in context
    const textDiv = document.createElement('div');
    if (labelText) {
      const heading = document.createElement('strong');
      heading.textContent = labelText;
      textDiv.appendChild(heading);
    }
    if (percentText) {
      const desc = document.createElement('div');
      desc.textContent = `Debt: ${percentText}`;
      textDiv.appendChild(desc);
    }
    rows.push([iconElem, textDiv]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
