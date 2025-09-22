# Dynamic Favicon

A lightweight, zero-dependency library to automatically change your website's favicon based on time, themes, or custom inputs.

[![NPM Version](https://img.shields.io/npm/v/dynamic-favicon.svg)](https://www.npmjs.com/package/dynamic-favicon)

## ✨ Features

- **Emoji Support**: Automatically converts any emoji to a high-quality favicon.
- **Built-in Themes**: Includes themes like `time_of_day` and `clock`.
- **Customizable**: Use your own list of emojis or image URLs.
- **Time-Based**: Change the favicon on any time interval you set.
- **Offline First**: Works perfectly offline as it has no external dependencies.
- **Performance Focused**: Tiny (~2KB gzipped) and optimized to never slow down your site.
- **Robust**: Gracefully handles errors without crashing your application.

## 🚀 Installation

#### Via NPM
```bash
npm install dynamic-favicon
```

#### Via CDN
For quick use in HTML, you can use a CDN like jsDelivr.
```html
<script src="[https://cdn.jsdelivr.net/npm/dynamic-favicon/dist/dynamic-favicon.umd.js](https://cdn.jsdelivr.net/npm/dynamic-favicon/dist/dynamic-favicon.umd.js)"></script>
```

## 💡 Quick Start

#### ES Module Usage (with a bundler)
```javascript
import DynamicFavicon from 'dynamic-favicon';

// Change the favicon every hour based on the time of day
const favicon = new DynamicFavicon({
  theme: 'time_of_day',
  interval: 3600 * 1000, // 1 hour
});

favicon.start();
```

#### CDN Usage (in a `<script>` tag)
```html
<script>
  // The library is available as window.DynamicFavicon
  const favicon = new DynamicFavicon({
    mode: 'emoji',
    theme: 'clock',
    interval: 5000 // every 5 seconds
  });
  favicon.start();
</script>
```

## ⚙️ Configuration Options

You can pass an options object to the constructor: `new DynamicFavicon(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | `'emoji'` | `'emoji'`, `'custom'`. Determines the source of favicons. |
| `theme`| `string` | `'time_of_day'` | Name of a built-in emoji theme. Ignored if `mode` is `custom`. |
| `custom` | `Array<string>` | `[]` | An array of emojis or image URLs to use when `mode` is `custom`. |
| `interval` | `number`| `3600000` | The time in milliseconds between favicon changes. |

### Custom Example
Use your own list of emojis or image URLs.

```javascript
const customFavicon = new DynamicFavicon({
  mode: 'custom',
  custom: ['🎉', '✨', '🎊', '🎈'],
  interval: 2000 // every 2 seconds
});
customFavicon.start();
```

## 📚 API

- `favicon.start()`: Begins the favicon rotation.
- `favicon.stop()`: Stops the rotation and restores the original favicon.

## 📜 License

MIT