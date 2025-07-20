/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards22)'];
  // Find the 'Quick Links' section
  const quickLinksSection = element.querySelector('.col-lg-9');
  if (!quickLinksSection) return;
  // The cards grid is the .row after the heading
  const allRows = quickLinksSection.querySelectorAll(':scope > .row');
  let cardsRow = null;
  for (const row of allRows) {
    if (row.querySelector('.col-md-4')) {
      cardsRow = row;
      break;
    }
  }
  if (!cardsRow) return;
  // Get all card columns
  const cardCols = Array.from(cardsRow.children).filter(child => child.classList && child.classList.contains('col-md-4'));
  // For each card, extract image and all <p> except arrow
  const rows = cardCols.map(col => {
    const img = col.querySelector('img');
    const textBox = col.querySelector('.col-8');
    if (!img || !textBox) return null;
    // All <p> except those with class 'child' (arrow icon)
    const textPs = Array.from(textBox.querySelectorAll('p')).filter(p => !p.classList.contains('child'));
    let textContent;
    const a = col.querySelector('a');
    if (a && a.getAttribute('href') && a.getAttribute('href') !== '' && !a.hasAttribute('data-bs-toggle')) {
      const link = document.createElement('a');
      link.href = a.getAttribute('href');
      // append all <p> nodes (preserves order and formatting)
      textPs.forEach(p => link.appendChild(p));
      textContent = link;
    } else {
      // If not linked, include all <p> in an array (so they're all in the cell)
      textContent = textPs;
    }
    return [img, textContent];
  }).filter(Boolean);
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  element.replaceWith(table);
}
