/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion root
  let accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // Build header row
  const rows = [['Accordion (accordion37)']];

  // Find all .card-header elements (these are the titles)
  const headers = Array.from(accordion.querySelectorAll('.card-header'));
  headers.forEach((header) => {
    // Find the title element (usually .card-title in an <a>)
    let titleElem = header.querySelector('.card-title') || header.querySelector('a');
    if (!titleElem) {
      // fallback to using the header itself
      titleElem = header;
    }
    // Find associated body: matches by href (e.g. href="#collapseThree" -> id="collapseThree")
    let contentElem = null;
    const href = header.getAttribute('href') || header.getAttribute('data-bs-target') || header.getAttribute('data-target');
    if (href && href.startsWith('#')) {
      const collapseId = href.slice(1);
      const body = accordion.querySelector(`#${collapseId}`);
      if (body) {
        // Prefer .p-4 inner div if present
        const p4 = body.querySelector('.p-4');
        if (p4) {
          contentElem = p4;
        } else {
          contentElem = body;
        }
      }
    } else {
      // fallback: next .card-body sibling
      let next = header.parentElement;
      while (next && !next.classList.contains('card-body')) {
        next = next.nextElementSibling;
      }
      if (next) {
        const p4 = next.querySelector('.p-4');
        if (p4) {
          contentElem = p4;
        } else {
          contentElem = next;
        }
      }
    }
    // Defensive: if contentElem is null, use empty <div>
    if (!contentElem) {
      contentElem = document.createElement('div');
    }
    rows.push([titleElem, contentElem]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
