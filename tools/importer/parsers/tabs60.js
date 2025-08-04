/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Build header row exactly as in the example (single cell 'Tabs')
  const rows = [['Tabs']];

  // 2. Get tab links (labels)
  const tabLinks = Array.from(element.querySelectorAll('li > a'));

  // 3. Find the closest '.tab-content' sibling for tab panes (if present)
  let tabContentRoot = null;
  let curr = element.nextElementSibling;
  while (curr) {
    if (curr.classList.contains('tab-content')) {
      tabContentRoot = curr;
      break;
    }
    curr = curr.nextElementSibling;
  }

  // 4. For each tab, add a row: [label, content], even if content is empty
  tabLinks.forEach(tabLink => {
    const label = tabLink.textContent.trim();
    let content = '';
    if (
      tabContentRoot &&
      tabLink.hasAttribute('href') &&
      tabLink.getAttribute('href').startsWith('#')
    ) {
      const paneId = tabLink.getAttribute('href').slice(1);
      const pane = tabContentRoot.querySelector(`#${paneId}`);
      if (pane) {
        content = pane;
      }
    }
    rows.push([label, content]);
  });

  // 5. Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
