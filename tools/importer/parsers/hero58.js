/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the example exactly
  const headerRow = ['Hero (hero58)'];

  // Background image: find the first image in .map .bg-images
  let bgImg = '';
  const bgImgEl = element.querySelector('.map .bg-images img');
  if (bgImgEl) {
    bgImg = bgImgEl;
  }

  // Content: extract all relevant headings, paragraphs, and the visible CTA link (as elements, not clones)
  let contentElements = [];
  const contentArea = element.querySelector('.map-above-content .container .row');
  if (contentArea) {
    // Left column: headings and paragraphs
    const leftCol = contentArea.querySelector('.col-md-6');
    if (leftCol) {
      const borderDiv = leftCol.querySelector('.border-l');
      if (borderDiv) {
        // Gather all heading and paragraph children (as elements in order)
        Array.from(borderDiv.children).forEach(child => {
          if (/^H[1-6]$/i.test(child.tagName) || child.tagName === 'P') {
            if (child.textContent.trim()) {
              contentElements.push(child);
            }
          }
        });
      }
    }
    // Right column: visible CTA link
    const rightCol = contentArea.querySelector('.col-md-4');
    if (rightCol) {
      // Find the first .m-expmore-btn p that is visible (style not display:none)
      const ctaPs = rightCol.querySelectorAll('.m-expmore-btn');
      for (const p of ctaPs) {
        const style = p.getAttribute('style');
        if (!style || !/display\s*:\s*none/.test(style)) {
          const a = p.querySelector('a');
          if (a) {
            contentElements.push(a);
            break;
          }
        }
      }
    }
  }

  if (contentElements.length === 0) {
    // fallback: get all headings and paragraphs anywhere in map-above-content
    const fallbackContent = element.querySelector('.map-above-content');
    if (fallbackContent) {
      contentElements = Array.from(fallbackContent.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a')).filter(
        el => el.textContent.trim() && (el.tagName !== 'A' || el.href)
      );
    } else {
      contentElements = [''];
    }
  }

  // Structure: 1 column, 3 rows (header, image, content)
  const imageRow = [bgImg || ''];
  const contentRow = [contentElements.length ? contentElements : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
