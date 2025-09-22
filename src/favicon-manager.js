let originalFavicon = null;
let faviconElement = null;

/**
 * Finds or creates the favicon link element in the document's head.
 */
function getFaviconElement() {
  if (faviconElement) return faviconElement;

  let link = document.querySelector('link[rel="icon"]');
  
  if (link) {
    originalFavicon = link.href;
  } else {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
    originalFavicon = ''; // No original favicon
  }
  
  faviconElement = link;
  return faviconElement;
}

/**
 * Sets the favicon to a new URL.
 * @param {string} url The URL or data URL for the new favicon.
 */
export function setFavicon(url) {
  try {
    const link = getFaviconElement();
    if (url) {
      link.href = url;
    }
  } catch (e) {
    console.error('[DynamicFavicon] DOM error:', e);
  }
}

/**
 * Restores the original favicon.
 */
export function restoreFavicon() {
  if (originalFavicon) {
    setFavicon(originalFavicon);
  }
}