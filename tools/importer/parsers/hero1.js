/* global WebImporter */
export default function parse(element, { document }) {
  // The block to replace is the section inside the .pageContent
  const section = element.querySelector('section') || element;
  // The main content is inside .container but fallback to section if not present
  const main = section.querySelector('.container') || section;
  
  // Header row must match exactly
  const headerRow = ['Hero (hero1)'];
  // No background image in supplied HTML
  const imageRow = [''];

  // Collect all visible content (exclude .d-none and .loadMore)
  const contentNodes = [];
  for (const child of main.childNodes) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child;
      if (
        el.classList && (el.classList.contains('d-none') || el.classList.contains('loadMore'))
      ) continue;
      contentNodes.push(el);
    } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
      // preserve text nodes that are not empty
      contentNodes.push(document.createTextNode(child.textContent));
    }
  }
  
  // Ensure all text content and visible HTML is included.
  const contentRow = [contentNodes];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element (the div.pageContent)
  element.replaceWith(table);
}
