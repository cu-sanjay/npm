import { renderFavicon } from './renderer.js';
import { EMOJI_THEMES, ANIMATION_THEMES } from './themes.js';
import { setFavicon, restoreFavicon, getOriginalFavicon } from './favicon-manager.js';

export default class DynamicFavicon {
  constructor(options = {}) {
    this.options = {
      mode: 'emoji', // 'emoji', 'animation', 'custom', 'badge'
      theme: 'time_of_day',
      custom: [],
      badge: null, // e.g., { value: '!', background: '#4285F4' }
      interval: 3600000,
      ...options,
    };

    this.timer = null;
    this.currentIndex = 0;
    this.isRunning = false;
    this.preloadedIcons = {}; // Cache for preloaded custom icons

    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
  }

  /**
   * Preloads custom icon URLs to ensure they exist before use.
   * @private
   */
  async _preloadCustomIcons() {
    const promises = this.options.custom.map(url => {
      if (this.preloadedIcons[url]) return Promise.resolve(); // Already loaded or failed
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          this.preloadedIcons[url] = img;
          resolve();
        };
        img.onerror = () => {
          console.warn(`[DynamicFavicon] Failed to load icon: ${url}. Skipping.`);
          this.preloadedIcons[url] = null; // Mark as failed
          resolve();
        };
        img.src = url;
      });
    });
    await Promise.all(promises);
  }

  /**
   * The core update loop.
   * @private
   */
  async _update() {
    if (!this.isRunning) return;

    let faviconUrl = '';
    const currentFavicon = getOriginalFavicon();

    switch (this.options.mode) {
      case 'custom': {
        const validIcons = this.options.custom.filter(url => this.preloadedIcons[url]);
        if (validIcons.length > 0) {
          const iconUrl = validIcons[this.currentIndex % validIcons.length];
          faviconUrl = iconUrl;
          this.currentIndex++;
        }
        break;
      }
      case 'animation': {
        const theme = ANIMATION_THEMES[this.options.theme] || ANIMATION_THEMES.spinner;
        const frame = theme[this.currentIndex % theme.length];
        faviconUrl = renderFavicon({ emoji: frame });
        this.currentIndex++;
        break;
      }
      case 'badge': {
        const baseIcon = new Image();
        baseIcon.crossOrigin = 'Anonymous';
        await new Promise(resolve => {
          baseIcon.onload = resolve;
          baseIcon.onerror = resolve; // Continue even if original fails
          baseIcon.src = currentFavicon;
        });
        faviconUrl = renderFavicon({ icon: baseIcon, badge: this.options.badge });
        break;
      }
      case 'emoji':
      default: {
        const theme = EMOJI_THEMES[this.options.theme] || EMOJI_THEMES.time_of_day;
        // ... (time_of_day logic remains the same)
        const hour = new Date().getHours();
        let emoji;
        if (this.options.theme === 'time_of_day') {
           if (hour >= 21 || hour < 6) emoji = theme[3];
           else if (hour >= 18) emoji = theme[2];
           else if (hour >= 6) emoji = theme[1];
           else emoji = theme[0];
        } else {
           emoji = theme[this.currentIndex % theme.length];
           this.currentIndex++;
        }
        faviconUrl = renderFavicon({ emoji });
        break;
      }
    }
    
    if (faviconUrl) {
        setFavicon(faviconUrl);
    }
    
    // Schedule next update only if not in badge mode (badge is a one-off)
    if (this.options.mode !== 'badge' && this.isRunning) {
      this.timer = setTimeout(() => this._update(), this.options.interval);
    }
  }

  /**
   * Starts the dynamic favicon updates.
   */
  async start() {
    this.isRunning = true;
    document.addEventListener('visibilitychange', this._handleVisibilityChange);
    
    if (this.options.mode === 'custom') {
      await this._preloadCustomIcons();
    }
    
    this._update();
  }

  /**
   * Stops the updates and restores the original favicon.
   */
  stop() {
    this.isRunning = false;
    clearTimeout(this.timer);
    this.timer = null;
    document.removeEventListener('visibilitychange', this._handleVisibilityChange);
    restoreFavicon();
  }
  
  /**
   * Updates the badge value dynamically.
   * @param {string|number} value - The new value for the badge.
   */
  updateBadge(value) {
    this.options.badge = { ...this.options.badge, value };
    this.options.mode = 'badge';
    this._update();
  }
  
  /**
   * Pauses or resumes updates when tab visibility changes.
   * @private
   */
  _handleVisibilityChange() {
    if (document.hidden) {
      clearTimeout(this.timer);
    } else if (this.isRunning && this.options.mode !== 'badge') {
      this._update();
    }
  }
}