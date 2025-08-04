/* global WebImporter */
export default function parse(element, { document }) {
  // Get the background image (first image in .bg-images)
  let bgImg = null;
  const bgImagesDiv = element.querySelector('.bg-images');
  if (bgImagesDiv) {
    const img = bgImagesDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // Get the content block (contains heading and ul)
  let contentBlock = null;
  const containerDiv = element.querySelector('.container');
  if (containerDiv) {
    const dredgingFleet = containerDiv.querySelector('.dredging-fleet');
    if (dredgingFleet) contentBlock = dredgingFleet;
  }

  // Prepare the rows as per the exact guidance
  const cells = [
    ['Hero (hero17)'],
    [bgImg ? bgImg : ''],
    [contentBlock ? contentBlock : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}