/* global WebImporter */
export default function parse(element, { document }) {
  // Get heading
  const heading = element.querySelector('h4.heading');

  // Get form
  const form = element.querySelector('form');
  if (!form) return;
  const rowDiv = form.querySelector('.row');
  if (!rowDiv) return;
  const rowChildren = Array.from(rowDiv.children);

  // Map fields by appearance/order in HTML
  // 0: Name
  // 1: Email
  // 2: Subject of Message
  // 3: Contact Number
  // 4: Message (textarea)
  // 5: Submit button (.col-md-12)

  // Build left column: heading, Name, Subject of Message, Message
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (rowChildren[0]) leftCol.appendChild(rowChildren[0]); // Name
  if (rowChildren[2]) leftCol.appendChild(rowChildren[2]); // Subject of Message
  if (rowChildren[4]) leftCol.appendChild(rowChildren[4]); // Message

  // Build right column: Email, Contact Number, Submit button
  const rightCol = document.createElement('div');
  if (rowChildren[1]) rightCol.appendChild(rowChildren[1]); // Email
  if (rowChildren[3]) rightCol.appendChild(rowChildren[3]); // Contact Number
  if (rowChildren[5]) rightCol.appendChild(rowChildren[5]); // Submit button

  // Compose table
  const cells = [
    ['Columns (columns43)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
