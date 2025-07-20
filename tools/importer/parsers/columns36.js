/* global WebImporter */
export default function parse(element, { document }) {
  // Find the form and section
  const form = element.querySelector('form.account-form');
  if (!form) return;
  const section = form.querySelector('section.py-5.bg-white1');
  if (!section) return;
  const container = section.querySelector(':scope > .container');
  if (!container) return;

  // COL 1: All main form fields, headings, instructions (excluding download links)
  const leftColumn = [];
  // COL 2: Download links only
  const rightColumn = [];

  // All container children for easy traversal
  const children = Array.from(container.children);

  // Helper function to get the next sibling that matches a filter
  function nextOf(idx, filterFn) {
    for (let i = idx + 1; i < children.length; i++) {
      if (filterFn(children[i])) return children[i];
    }
    return null;
  }

  // --- Bank Details Section ---
  const bankHeadingIdx = children.findIndex(el => el.tagName === 'H2' && el.textContent.includes('Bank Details'));
  if (bankHeadingIdx > -1) {
    leftColumn.push(children[bankHeadingIdx]);
    const bankRow = nextOf(bankHeadingIdx, el => el.classList.contains('row'));
    if (bankRow) leftColumn.push(bankRow);
  }
  // --- Company Details ---
  const compHeadingIdx = children.findIndex(el => el.tagName === 'H2' && el.textContent.includes('Company Details'));
  if (compHeadingIdx > -1) {
    leftColumn.push(children[compHeadingIdx]);
    const compRow = nextOf(compHeadingIdx, el => el.classList.contains('row'));
    if (compRow) leftColumn.push(compRow);
  }
  // --- Payment Details ---
  const payHeadingIdx = children.findIndex(el => el.tagName === 'H2' && el.textContent.includes('Payment Details'));
  if (payHeadingIdx > -1) {
    leftColumn.push(children[payHeadingIdx]);
    const payRow = nextOf(payHeadingIdx, el => el.classList.contains('row'));
    if (payRow) leftColumn.push(payRow);
  }
  // --- Upload Payment Section (heading & file input col) ---
  const uploadHeadingIdx = children.findIndex(el => el.tagName === 'H2' && el.textContent.includes('Upload Payment'));
  if (uploadHeadingIdx > -1) {
    leftColumn.push(children[uploadHeadingIdx]);
    // The upload input is in the next .col-lg-6
    const uploadCol = container.querySelector('.custom-file')?.closest('.col-lg-6');
    if (uploadCol) leftColumn.push(uploadCol);
  }
  // --- Enter Invoice Section (heading & invoice entry cols) ---
  const invHeadingIdx = children.findIndex(el => el.tagName === 'H2' && el.textContent.includes('Enter Invoice Details'));
  if (invHeadingIdx > -1) {
    leftColumn.push(children[invHeadingIdx]);
    // All .col-lg-2.col-md-6.mb-2 cols between this heading and next H2 or end
    // We'll take all such fields
    const invoiceCols = Array.from(container.querySelectorAll('.col-lg-2.col-md-6.mb-2'));
    invoiceCols.forEach(col => leftColumn.push(col));
    // Add the Add More Invoice button
    const addMoreBtn = section.querySelector('button.Add_More_Invoice_Fields');
    if (addMoreBtn) {
      const addMoreContainer = addMoreBtn.closest('.removeinvoice');
      if (addMoreContainer) leftColumn.push(addMoreContainer);
    }
  }
  // --- Disclaimer (first .small p) ---
  const disclaimer = section.querySelector('p.small');
  if (disclaimer) leftColumn.push(disclaimer);
  // --- Contact info ---
  const contact = Array.from(section.querySelectorAll('p')).find(p => /queries related/i.test(p.textContent));
  if (contact) leftColumn.push(contact);

  // --- Download links (right column) ---
  const downloadLinks = Array.from(container.querySelectorAll('a.btn.btn-secondary'));
  if (downloadLinks.length) rightColumn.push(...downloadLinks);

  // Compose table (two columns)
  const cells = [
    ['Columns (columns36)'],
    [leftColumn, rightColumn]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
