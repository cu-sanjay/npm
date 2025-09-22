import { emojiToDataURL } from './utils.js';
import { EMOJI_THEMES } from './themes.js';
import { setFavicon, restoreFavicon } from './favicon-manager.js';

export default class DynamicFavicon {
  constructor(options = {}) {
    // Default options
    this.options = {
      mode: 'emoji', // 'emoji', 'icon', 'custom'
      theme: 'time_of_day',
      custom: [],
      interval: 60 * 60 * 1000, // 1 hour
      ...options,
    };

    this.timer = null;
    this.currentIndex = 0;
    this.faviconQueue = this._createFaviconQueue();
  }

  /**
   * Creates the list of favicons to cycle through based on options.
   * @private
   */
  _createFaviconQueue() {
    switch (this.options.mode) {
      case 'custom':
        return this.options.custom;
      case 'emoji':
      default:
        return EMOJI_THEMES[this.options.theme] || EMOJI_THEMES['time_of_day'];
    }
  }

  /**
   * The core update loop. Sets the favicon and schedules the next update.
   * @private
   */
  _update() {
    if (!this.faviconQueue || this.faviconQueue.length === 0) return;

    let faviconData;

    // Special logic for time_of_day theme
    if (this.options.theme === 'time_of_day') {
      const hour = new Date().getHours();
      if (hour >= 21 || hour < 6) faviconData = this.faviconQueue[3];  // Moon
      else if (hour >= 18)        faviconData = this.faviconQueue[2];  // Sunset
      else if (hour >= 6)         faviconData = this.faviconQueue[1];  // Sun
      else                        faviconData = this.faviconQueue[0];  // Sunrise
    } else {
      faviconData = this.faviconQueue[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.faviconQueue.length;
    }
    
    // Generate data URL if it's an emoji
    const finalUrl = this.options.mode === 'emoji' ? emojiToDataURL(faviconData) : faviconData;
    setFavicon(finalUrl);

    // Schedule the next update
    this.timer = setTimeout(() => this._update(), this.options.interval);
  }

  /**
   * Starts the dynamic favicon updates.
   */
  start() {
    this.stop(); // Ensure no multiple loops are running
    this._update();
  }

  /**
   * Stops the dynamic favicon updates and restores the original.
   */
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    restoreFavicon();
  }
}