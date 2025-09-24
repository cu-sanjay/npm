# Dynamic Favicon v2.0

A lightweight, zero-dependency library to dynamically change your website's favicon based on time, themes, animations, or notifications.

[![NPM Version](https://img.shields.io/npm/v/dynamic-favicon.svg)](https://www.npmjs.com/package/dynamic-favicon)

## ✨ Features

* **Emoji Support**: Convert any emoji into a high-quality favicon.
* **Built-in Themes**: Includes `time_of_day`, `clock`, and `spinner` animation themes.
* **Notification Badges**: Add counts or dots to your favicon, ideal for alerts.
* **Animations**: Simple animated favicons such as spinners and loops.
* **Customizable**: Supply your own list of emojis or image URLs.
* **Time-Based Rotation**: Rotate favicons at any interval (seconds, minutes, hours, days).
* **Performance Optimized**: Automatically pauses updates when the tab is hidden to save battery and CPU.
* **Offline First**: Works fully offline with zero dependencies.
* **Robust**: Skips invalid URLs and gracefully handles errors.
* **Lightweight**: \~2KB gzipped.

## 🚀 Installation

### NPM

```bash
npm install dynamic-favicon
```

### CDN

For quick integration in HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/dynamic-favicon/dist/dynamic-favicon.umd.js"></script>
```

## 💡 Quick Start

### ES Module Usage

```javascript
import DynamicFavicon from 'dynamic-favicon';

// Change favicon every hour based on time of day
const favicon = new DynamicFavicon({
  mode: 'emoji',
  theme: 'time_of_day',
  interval: 3600 * 1000 // 1 hour
});
favicon.start();
```

### CDN Usage

```html
<script>
  const favicon = new DynamicFavicon({
    mode: 'emoji',
    theme: 'clock',
    interval: 5000 // every 5 seconds
  });
  favicon.start();
</script>
```

---

## ⚙️ Configuration Options

| Option     | Type            | Default         | Description                                                        |
| ---------- | --------------- | --------------- | ------------------------------------------------------------------ |
| `mode`     | `string`        | `'emoji'`       | One of `'emoji'`, `'animation'`, `'custom'`, `'badge'`.            |
| `theme`    | `string`        | `'time_of_day'` | Built-in emoji or animation theme.                                 |
| `custom`   | `Array<string>` | `[]`            | Array of emojis or image URLs (`.ico`, `.png`, `.svg`).            |
| `interval` | `number`        | `3600000`       | Interval in ms between changes or animation frames.                |
| `badge`    | `object`        | `null`          | Badge config: `{ value: '!', background: '#f00', color: '#fff' }`. |

---

## 📚 API

* `favicon.start()` → Starts favicon rotation or animation.
* `favicon.stop()` → Stops updates and restores the original favicon.
* `favicon.updateBadge(value)` → Adds or updates a badge. Pass empty string to clear.

---

## 🔧 Usage Examples

### 1. Custom Icons

```javascript
const customFavicon = new DynamicFavicon({
  mode: 'custom',
  custom: ['🎉', '✨', '🎊', '🎈'],
  interval: 2000
});
customFavicon.start();
```

### 2. Notification Badge

```javascript
const favicon = new DynamicFavicon();

// Set a badge with number
favicon.updateBadge('3');

// Clear the badge
favicon.updateBadge('');
```

### 3. Animation Theme

```javascript
const spinner = new DynamicFavicon({
  mode: 'animation',
  theme: 'spinner',
  interval: 300 // 300 ms per frame
});
spinner.start();
```
>[!TIP]
> You may use image URLs from sources like Flaticon or Icons8 in **custom** mode. This library does not bundle them to avoid licensing restrictions. You remain in control of compliance.

## 📜 License

MIT License