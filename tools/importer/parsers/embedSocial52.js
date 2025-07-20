/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all direct children of the element for maximal coverage and resilience
  const children = Array.from(element.childNodes);
  // If the element is empty or only whitespace, fallback to textContent
  let content;
  if (children.length === 0 || (children.length === 1 && children[0].textContent.trim() === '')) {
    content = element.textContent.trim() || '';
  } else {
    // If there is any visible content, preserve all as a fragment
    const frag = document.createDocumentFragment();
    children.forEach(child => frag.appendChild(child));
    content = frag.childNodes.length === 1 ? frag.firstChild : frag;
  }
  // Ensure at least an empty string if nothing else
  const cells = [
    ['Embed'],
    [content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}