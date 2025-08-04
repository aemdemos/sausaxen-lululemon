/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to make image src absolute
  function makeAbsolute(src) {
    if (!src) return '';
    const a = document.createElement('a');
    a.href = src;
    return a.href;
  }

  // --- 1. Extract HERO BACKGROUND IMAGE/VIDEO ---
  let backgroundAsset = '';
  const carousel = element.querySelector('.bootstrape-carousel');
  let activeItem = null;
  if (carousel) {
    // Find the active carousel slide .bootstrape-item.active .item
    activeItem = carousel.querySelector('.bootstrape-item.active .item');
    if (!activeItem) {
      // fallback to just first .item
      activeItem = carousel.querySelector('.item');
    }
  }

  if (activeItem) {
    // Prefer image, otherwise video as a link
    const img = activeItem.querySelector('img');
    if (img) {
      img.src = makeAbsolute(img.getAttribute('src'));
      backgroundAsset = img;
    } else {
      const video = activeItem.querySelector('video');
      if (video && video.querySelector('source')) {
        const source = video.querySelector('source');
        const url = makeAbsolute(source.getAttribute('src'));
        const a = document.createElement('a');
        a.href = url;
        a.textContent = 'Background Video';
        backgroundAsset = a;
      }
    }
  }

  // --- 2. Extract HERO FOREGROUND CONTENT (headline, subheadline, cta, etc.) ---
  // In provided HTML, this is likely in .container.position-relative or within .scroll-down
  let foregroundContentArr = [];
  const container = element.querySelector('.container.position-relative');
  if (container) {
    // Look for any heading, subheading, or visible text in container
    // If container has a .scroll-down, use its content (typically CTA or visual prompt)
    const scrollDown = container.querySelector('.scroll-down');
    if (scrollDown) {
      // Use all children of .scroll-down (e.g. link with animated spans)
      foregroundContentArr = Array.from(scrollDown.childNodes).filter(n => {
        // Only keep element or text nodes with non-empty content
        return (n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim()));
      });
    } else {
      // If not, gather all direct children of the container
      foregroundContentArr = Array.from(container.childNodes).filter(n => (
        n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      ));
    }
  }

  // If no foreground content, leave row empty
  let foregroundCell = '';
  if (foregroundContentArr && foregroundContentArr.length) {
    foregroundCell = foregroundContentArr;
  }

  // --- 3. Compose block table ---
  const cells = [
    ['Hero (hero44)'],
    [backgroundAsset],
    [foregroundCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
