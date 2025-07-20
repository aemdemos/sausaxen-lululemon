/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row exactly as required
  const headerRow = ['Cards (cards45)'];

  // Find the carousel structure
  const carousel = element.querySelector('.bootstrape-carousel');
  if (!carousel) return;
  const stage = carousel.querySelector('.bootstrape-stage');
  if (!stage) return;
  // Only non-cloned .bootstrape-item (avoiding duplicates in carousel)
  const items = Array.from(stage.querySelectorAll(':scope > .bootstrape-item:not(.cloned)'));

  // Build rows for the cards table
  const rows = items.map(item => {
    const zoomin = item.querySelector('.item.zoomin');
    if (!zoomin) return null;
    // Image: first <img> inside the first <a>
    const imgLink = zoomin.querySelector('a[href]');
    const img = imgLink ? imgLink.querySelector('img') : null;
    // Text: <p> (may contain <a> with the title)
    const labelPara = zoomin.querySelector('p');
    let textCell;
    if (labelPara) {
      // Use the existing <p> element, but replace its child <a> with <strong> for title
      // (reference nodes directly, do not clone unless necessary)
      // But to avoid side-effects, create a fragment to hold final nodes
      const frag = document.createDocumentFragment();
      let hasStrong = false;
      labelPara.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
          const strong = document.createElement('strong');
          strong.textContent = node.textContent;
          frag.appendChild(strong);
          hasStrong = true;
        } else {
          frag.appendChild(node.cloneNode(true));
        }
      });
      textCell = frag;
    } else {
      textCell = '';
    }
    // Only include if there's an image and text
    if (img && textCell) {
      return [img, textCell];
    }
    return null;
  }).filter(Boolean);

  // Compose table structure
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace original element
  element.replaceWith(table);
}
