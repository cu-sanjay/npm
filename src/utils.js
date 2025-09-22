/**
 * Creates a data URL for a favicon from an emoji.
 * @param {string} emoji The emoji character.
 * @param {number} size The desired size of the favicon (e.g., 64).
 * @returns {string} A base64 encoded data URL.
 */
export function emojiToDataURL(emoji, size = 64) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Set a transparent background
    ctx.clearRect(0, 0, size, size);
    
    // Draw the emoji
    ctx.font = `${size * 0.9}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2);
    
    return canvas.toDataURL('image/png');
  } catch (e) {
    console.error('[DynamicFavicon] Canvas error:', e);
    return '';
  }
}