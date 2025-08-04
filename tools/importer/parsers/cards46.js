/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const rows = [
    ['Cards (cards46)']
  ];

  // Get all direct card wrappers (col-lg-6)
  const cardCols = element.querySelectorAll('.row > div');

  cardCols.forEach(cardCol => {
    const link = cardCol.querySelector('a');
    if (!link) return;
    const cardBox = link.querySelector('.chairman-box');
    if (!cardBox) return;

    // Image cell
    const imgContainer = cardBox.querySelector('.col-md-4 img');
    const imageEl = imgContainer || '';

    // Text cell content
    const textCol = cardBox.querySelector('.col-md-8');
    const textContent = [];
    if (textCol) {
      // Title (Heading)
      const h3 = textCol.querySelector('h3');
      if (h3) textContent.push(h3);
      // Description (h4)
      const h4 = textCol.querySelector('h4');
      if (h4) textContent.push(h4);
      // Call-to-action (Read more), convert to link
      const readMore = textCol.querySelector('p.readmore');
      if (readMore && link && link.getAttribute('href')) {
        const ctaLink = document.createElement('a');
        ctaLink.href = link.getAttribute('href');
        ctaLink.textContent = readMore.textContent.trim();
        const ctaPara = document.createElement('p');
        ctaPara.appendChild(ctaLink);
        textContent.push(ctaPara);
      }
      // Signature (Name and Title)
      const signature = textCol.querySelector('p.signature');
      if (signature) textContent.push(signature);
    }

    rows.push([
      imageEl,
      textContent
    ]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
