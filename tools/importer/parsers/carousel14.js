/* global WebImporter */
export default function parse(element, { document }) {
  // Find the mainBanner - this is the block we want to replace
  const banner = element.querySelector('.mainBanner');
  if (!banner) return;

  // Find the carousel slides container
  const carousel = banner.querySelector('.bootstrape-carousel');
  if (!carousel) return;
  const stageOuter = carousel.querySelector('.bootstrape-stage-outer');
  if (!stageOuter) return;
  const stage = stageOuter.querySelector('.bootstrape-stage');
  if (!stage) return;

  // Each .bootstrape-item inside stage is a slide
  const items = stage.querySelectorAll('.bootstrape-item');

  // Prepare table rows
  const rows = [];
  // Block header, must match example exactly
  rows.push(['Carousel (carousel14)']);

  items.forEach(item => {
    // Actual slide content is inside .item > .slider-content
    const slideContent = item.querySelector('.slider-content');
    if (!slideContent) return;

    // Image (mandatory): first img in slideContent
    const img = slideContent.querySelector('img');
    let imgCell = '';
    if (img) {
      imgCell = img;
    }

    // Text content (optional): find container with text
    let textCell = '';
    // The text is inside div > div.container > p
    const containerDiv = slideContent.querySelector('div > .container');
    if (containerDiv) {
      // Reference the containerDiv, which may have <p> or more
      textCell = containerDiv;
    }

    rows.push([
      imgCell,
      textCell,
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original mainBanner with the new block table
  banner.replaceWith(table);
}
