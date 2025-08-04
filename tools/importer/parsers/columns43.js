/* global WebImporter */
export default function parse(element, { document }) {
  // Get the section's inner container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the heading (e.g., Write to us)
  const heading = container.querySelector('.heading');

  // Get the contact form wrapper
  const contactForm = container.querySelector('.contact-form');

  // Compose a block with two columns
  // Left: heading + contact form
  // Right: intentionally blank
  const left = document.createElement('div');
  if (heading) left.appendChild(heading);
  if (contactForm) left.appendChild(contactForm);

  const right = document.createElement('div'); // blank right column, matches screenshot structure

  // Set up the block header and rows
  const cells = [
    ['Columns (columns43)'],
    [left, right],
  ];

  // Create and replace the block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
