/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Convert relative src to absolute
  function getAbsoluteUrl(src) {
    const a = document.createElement('a');
    a.href = src;
    return a.href;
  }

  // 1. Header row
  const headerRow = ['Hero (hero44)'];

  // 2. Background image row
  let imgEl = null;
  const activeItem = element.querySelector('.bootstrape-item.active .item');
  if (activeItem) {
    imgEl = activeItem.querySelector('img');
    if (imgEl && imgEl.hasAttribute('src')) {
      imgEl.src = getAbsoluteUrl(imgEl.getAttribute('src'));
    }
  }
  if (!imgEl) {
    imgEl = element.querySelector('img');
    if (imgEl && imgEl.hasAttribute('src')) {
      imgEl.src = getAbsoluteUrl(imgEl.getAttribute('src'));
    }
  }
  const bgImageRow = [imgEl ? imgEl : ''];

  // 3. Text content row: robustly gather all visible text blocks not in navigation, dots, or scroll-down
  function getVisibleTextBlocks(root) {
    const selectors = ['h1','h2','h3','h4','h5','h6','p','span','div','a'];
    const allTextEls = Array.from(root.querySelectorAll(selectors.join(',')));
    // Only keep those with visible text, not inside nav/dots/scroll-down, not image/video only
    let filtered = allTextEls.filter(el => {
      if (
        el.closest('.bootstrape-nav') ||
        el.closest('.bootstrape-dots') ||
        el.closest('.scroll-down')
      ) return false;
      if (!el.textContent.trim()) return false;
      // If every child is img/video, ignore
      if (el.children.length > 0 && Array.from(el.children).every(c => c.tagName === 'IMG' || c.tagName === 'VIDEO')) return false;
      return true;
    });
    // Only return outermost (not nested inside another in the same list)
    filtered = filtered.filter(el => !filtered.some(parent => parent !== el && parent.contains(el)));
    return filtered;
  }

  const textBlocks = getVisibleTextBlocks(element);
  let contentRow;
  if (textBlocks.length) {
    // Place all text blocks in a vertical column
    contentRow = [textBlocks];
  } else {
    contentRow = [''];
  }

  // Final table
  const cells = [headerRow, bgImageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
