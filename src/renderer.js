// NEW: Handles all canvas drawing (emojis, badges)
// utils.js is now replaced by renderer.js

/**
 * Renders a favicon from various sources onto a canvas and returns a data URL.
 * @param {object} options
 * @param {string} [options.emoji] - The emoji to render.
 * @param {HTMLImageElement} [options.icon] - An image element to render.
 * @param {object} [options.badge] - Badge configuration.
 * @param {string|number} [options.badge.value] - The text for the badge.
 * @param {string} [options.badge.background] - Background color of the badge.
 * @param {string} [options.badge.color] - Text color of the badge.
 * @param {number} size - The canvas dimension.
 * @returns {string} A base64 encoded data URL.
 */
export function renderFavicon(options, size = 64) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw the base layer (icon or emoji)
    if (options.icon) {
      ctx.drawImage(options.icon, 0, 0, size, size);
    } else if (options.emoji) {
      ctx.font = `${size * 0.9}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(options.emoji, size / 2, size / 2 + size * 0.05); // Small offset for better centering
    }

    // Draw the badge on top, if configured
    if (options.badge && options.badge.value) {
      drawBadge(ctx, options.badge, size);
    }

    return canvas.toDataURL('image/png');
  } catch (e) {
    console.error('[DynamicFavicon] Canvas rendering error:', e);
    return '';
  }
}

/**
 * Helper to draw the badge onto the canvas context.
 */
function drawBadge(ctx, badge, size) {
  const value = badge.value.toString();
  const badgeSize = size * 0.55;
  const center = size - badgeSize / 2;
  
  // Badge background
  ctx.beginPath();
  ctx.arc(center, center, badgeSize / 2, 0, 2 * Math.PI);
  ctx.fillStyle = badge.background || '#FF3B30'; // iOS red
  ctx.fill();

  // Badge text
  ctx.font = `bold ${badgeSize * 0.65}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = badge.color || '#FFFFFF';
  ctx.fillText(value, center, center);
}