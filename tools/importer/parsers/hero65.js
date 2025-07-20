/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row matches exactly: 'Hero (hero65)'
  const headerRow = ['Hero (hero65)'];

  // 2. Background image: Not present, so leave empty string as cell
  const backgroundImageRow = [''];

  // 3. Content row: Heading and CTA button
  // The source structure is:
  // <section ...>
  //   <div class="container">
  //     <h2>
  //       ... text ...
  //       <span><a>...</a></span>
  //     </h2>
  //   </div>
  // </section>

  // We want to reference the actual h2 from the DOM, not a clone
  // We'll extract <h2> from the DOM and use it directly
  // (It is safe because we're going to replace the whole block with the table)

  let contentCell = '';
  const section = element.querySelector('section');
  if (section) {
    const h2 = section.querySelector('h2');
    if (h2) {
      contentCell = h2;
    }
  }

  // Table structure: 1 column, 3 rows
  const cells = [
    headerRow,
    backgroundImageRow,
    [contentCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original entire element with the block table
  element.replaceWith(block);
}