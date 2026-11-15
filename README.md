# BadgeForge for Revenge

BadgeForge is a JavaScript Revenge plugin packaged as a ZIP containing `manifest.json` and the bundled `index.js`.

## Install directly on Android (recommended)

The URL shown in the repeated **Install Failed / Failed to fetch manifest** dialog is being handled as a direct plugin URL, not as a repository index. Do not paste the repository's `index.json` into that direct-plugin importer.

1. Download the packaged plugin ZIP:
   https://raw.githubusercontent.com/tiktoknotificationtroll-wq/Revenge-plugins/gh-pages/pool/dev.nichegames.badgeforge@1.0.0.zip
2. In Revenge, open Settings → Revenge → Plugins.
3. Tap the settings gear next to the Plugins heading.
4. Under Advanced, choose **Install from file**.
5. Select the downloaded `.zip`.

## Add as a repository (optional)

Use the repository index URL only in the repository manager (settings gear → Add repository), not in the direct plugin URL importer:

```
https://raw.githubusercontent.com/tiktoknotificationtroll-wq/Revenge-plugins/gh-pages/index.json
```

Revenge's repository manager reads `index.json`; direct ZIP sideloading bypasses repository discovery and checksum/index fetching.

## What the plugin does

BadgeForge currently provides a local profile showcase/settings preview for custom badge labels, a pretend account creation date, and game-hour text. These are mock values; it does not grant Discord-issued badges or change Discord's server-side account metadata or actual game statistics.

## Source

- Plugin manifest: `plugins/badgeforge/manifest.json`
- JavaScript/TypeScript source: `plugins/badgeforge/js/index.tsx`
