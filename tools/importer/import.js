/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns3Parser from './parsers/columns3.js';
import columns9Parser from './parsers/columns9.js';
import hero1Parser from './parsers/hero1.js';
import cardsNoImages13Parser from './parsers/cardsNoImages13.js';
import columns7Parser from './parsers/columns7.js';
import cards11Parser from './parsers/cards11.js';
import hero17Parser from './parsers/hero17.js';
import columns18Parser from './parsers/columns18.js';
import accordion16Parser from './parsers/accordion16.js';
import hero2Parser from './parsers/hero2.js';
import cards20Parser from './parsers/cards20.js';
import columns5Parser from './parsers/columns5.js';
import columns23Parser from './parsers/columns23.js';
import columns12Parser from './parsers/columns12.js';
import hero21Parser from './parsers/hero21.js';
import table8Parser from './parsers/table8.js';
import hero24Parser from './parsers/hero24.js';
import cards29Parser from './parsers/cards29.js';
import cards25Parser from './parsers/cards25.js';
import columns30Parser from './parsers/columns30.js';
import cardsNoImages32Parser from './parsers/cardsNoImages32.js';
import columns10Parser from './parsers/columns10.js';
import columns19Parser from './parsers/columns19.js';
import cards6Parser from './parsers/cards6.js';
import cards26Parser from './parsers/cards26.js';
import columns35Parser from './parsers/columns35.js';
import carousel14Parser from './parsers/carousel14.js';
import cards22Parser from './parsers/cards22.js';
import accordion37Parser from './parsers/accordion37.js';
import accordion40Parser from './parsers/accordion40.js';
import columns38Parser from './parsers/columns38.js';
import columns27Parser from './parsers/columns27.js';
import columns31Parser from './parsers/columns31.js';
import cards46Parser from './parsers/cards46.js';
import columns34Parser from './parsers/columns34.js';
import columns43Parser from './parsers/columns43.js';
import cardsNoImages49Parser from './parsers/cardsNoImages49.js';
import cards39Parser from './parsers/cards39.js';
import hero28Parser from './parsers/hero28.js';
import carousel48Parser from './parsers/carousel48.js';
import columns53Parser from './parsers/columns53.js';
import columns36Parser from './parsers/columns36.js';
import cardsNoImages50Parser from './parsers/cardsNoImages50.js';
import cards47Parser from './parsers/cards47.js';
import columns56Parser from './parsers/columns56.js';
import columns57Parser from './parsers/columns57.js';
import columns55Parser from './parsers/columns55.js';
import columns59Parser from './parsers/columns59.js';
import tabs60Parser from './parsers/tabs60.js';
import columns62Parser from './parsers/columns62.js';
import columns54Parser from './parsers/columns54.js';
import columns61Parser from './parsers/columns61.js';
import columns64Parser from './parsers/columns64.js';
import tableBordered41Parser from './parsers/tableBordered41.js';
import hero65Parser from './parsers/hero65.js';
import hero58Parser from './parsers/hero58.js';
import columns63Parser from './parsers/columns63.js';
import embedSocial52Parser from './parsers/embedSocial52.js';
import cards51Parser from './parsers/cards51.js';
import columns33Parser from './parsers/columns33.js';
import hero44Parser from './parsers/hero44.js';
import cards45Parser from './parsers/cards45.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns3: columns3Parser,
  columns9: columns9Parser,
  hero1: hero1Parser,
  cardsNoImages13: cardsNoImages13Parser,
  columns7: columns7Parser,
  cards11: cards11Parser,
  hero17: hero17Parser,
  columns18: columns18Parser,
  accordion16: accordion16Parser,
  hero2: hero2Parser,
  cards20: cards20Parser,
  columns5: columns5Parser,
  columns23: columns23Parser,
  columns12: columns12Parser,
  hero21: hero21Parser,
  table8: table8Parser,
  hero24: hero24Parser,
  cards29: cards29Parser,
  cards25: cards25Parser,
  columns30: columns30Parser,
  cardsNoImages32: cardsNoImages32Parser,
  columns10: columns10Parser,
  columns19: columns19Parser,
  cards6: cards6Parser,
  cards26: cards26Parser,
  columns35: columns35Parser,
  carousel14: carousel14Parser,
  cards22: cards22Parser,
  accordion37: accordion37Parser,
  accordion40: accordion40Parser,
  columns38: columns38Parser,
  columns27: columns27Parser,
  columns31: columns31Parser,
  cards46: cards46Parser,
  columns34: columns34Parser,
  columns43: columns43Parser,
  cardsNoImages49: cardsNoImages49Parser,
  cards39: cards39Parser,
  hero28: hero28Parser,
  carousel48: carousel48Parser,
  columns53: columns53Parser,
  columns36: columns36Parser,
  cardsNoImages50: cardsNoImages50Parser,
  cards47: cards47Parser,
  columns56: columns56Parser,
  columns57: columns57Parser,
  columns55: columns55Parser,
  columns59: columns59Parser,
  tabs60: tabs60Parser,
  columns62: columns62Parser,
  columns54: columns54Parser,
  columns61: columns61Parser,
  columns64: columns64Parser,
  tableBordered41: tableBordered41Parser,
  hero65: hero65Parser,
  hero58: hero58Parser,
  columns63: columns63Parser,
  embedSocial52: embedSocial52Parser,
  cards51: cards51Parser,
  columns33: columns33Parser,
  hero44: hero44Parser,
  cards45: cards45Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all elements using parsers
  [...blockElements, ...pageElements].forEach((item) => {
    const { element = main, ...pageBlock } = item;
    const isBlockElement = blockElements.includes(item);
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      let parserElement = element;
      if (typeof parserElement === 'string') {
        parserElement = main.querySelector(parserElement);
      }
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, parserElement, { ...source });
      // parse the element
      if (isBlockElement) {
        WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      }
      parserFn.call(this, parserElement, { ...source });
      if (isBlockElement) {
        WebImporter.DOMUtils.createTable = tableBuilder.restore();
      }
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, parserElement, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${parserName}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
