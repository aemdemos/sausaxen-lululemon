/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content section
  const contentSection = element.querySelector('.contentSection.homepage');
  if (!contentSection) return;

  // Get breadcrumb section (top heading area)
  const breadcrumbSection = contentSection.querySelector('.breadcrumb-sub-layout');
  // Get main form
  const form = contentSection.querySelector('form.account-form');
  if (!form) return;

  // Get the main content section inside the form
  const mainSection = form.querySelector('section.py-5.bg-white1');
  if (!mainSection) return;
  const mainChildren = Array.from(mainSection.children);

  // Find indexes for logical groupings
  let uploadIdx = -1, manualIdx = -1, disclaimerIdx = -1;
  mainChildren.forEach((child, idx) => {
    const h2 = child.querySelector && child.querySelector('h2');
    if (h2) {
      if (h2.textContent.includes('Upload Payment against Invoice document')) uploadIdx = idx;
      if (h2.textContent.includes('Enter Invoice Details Manually')) manualIdx = idx;
    }
    const p = child.querySelector && child.querySelector('p.small');
    if (p && p.textContent.includes('reasonable efforts')) disclaimerIdx = idx;
  });
  if (uploadIdx === -1) uploadIdx = mainChildren.length;
  if (manualIdx === -1) manualIdx = mainChildren.length;
  if (disclaimerIdx === -1) disclaimerIdx = mainChildren.length;

  // Helper to aggregate nodes into a div
  function collectNodes(nodes) {
    const wrapper = document.createElement('div');
    nodes.forEach(n => wrapper.appendChild(n));
    return wrapper;
  }

  // Row 1, Col 1: Breadcrumb and all up to Upload Payment against Invoice doc
  const row1col1 = [];
  if (breadcrumbSection) row1col1.push(breadcrumbSection);
  for (let i = 0; i < uploadIdx; i++) row1col1.push(mainChildren[i]);

  // Row 1, Col 2: Upload Payment against Invoice doc section (uploadIdx to manualIdx)
  const row1col2 = [];
  for (let i = uploadIdx; i < manualIdx; i++) row1col2.push(mainChildren[i]);

  // Row 2, Col 1: Enter Invoice Details Manually (manualIdx to disclaimerIdx)
  const row2col1 = [];
  for (let i = manualIdx; i < disclaimerIdx; i++) row2col1.push(mainChildren[i]);

  // Row 2, Col 2: Disclaimer and everything after (disclaimerIdx to end)
  const row2col2 = [];
  for (let i = disclaimerIdx; i < mainChildren.length; i++) row2col2.push(mainChildren[i]);

  // Compose block with two rows, two columns, header row
  const cells = [
    ['Columns (columns36)'],
    [collectNodes(row1col1), collectNodes(row1col2)],
    [collectNodes(row2col1), collectNodes(row2col2)]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
