/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name, exactly as in example
  const headerRow = ['Hero (hero24)'];

  // 2. Background image row (first <img> in section)
  let bgImg = element.querySelector('img');
  const bgRow = [bgImg ? bgImg : ''];

  // 3. Content row: includes all visible text, headings, and CTA link
  // The structure in the screenshot is: Heading (Login), Subheading (Please Login), CTA (Register link), plus all visible text
  // To ensure all content is captured, include all children of the .box-login that are not form inputs or buttons
  const boxLogin = element.querySelector('.box-login');
  let contentParts = [];
  if (boxLogin) {
    boxLogin.childNodes.forEach(node => {
      // Only include element nodes or text nodes with meaningful text
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        // Exclude input fields, buttons, and forms
        if (
          tag !== 'form' &&
          tag !== 'input' &&
          tag !== 'button'
        ) {
          // For .form-group, .seperater, etc: only keep if they have visible text or links
          if (tag === 'div') {
            // Only append if contains visible paragraph, link, or text
            const relevant = node.querySelector('a, p, h1, h2, h3, h4');
            if (relevant || node.textContent.trim()) {
              contentParts.push(node);
            }
          } else {
            contentParts.push(node);
          }
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        contentParts.push(document.createTextNode(node.textContent));
      }
    });
  }
  // If nothing captured, fallback to empty string
  const contentRow = [contentParts.length > 0 ? contentParts : ''];

  // Compose and create the block table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the overall top-level element with the new table
  element.replaceWith(table);
}
