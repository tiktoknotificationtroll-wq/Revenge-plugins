# BadgeForge for Revenge

A Revenge plugin repository containing BadgeForge.

## Install in current Revenge

**Add this as a repository, not as a direct plugin/manifest URL.**

1. Open **Settings → Revenge → Plugins**.
2. Tap the small **settings gear** beside the Plugins heading.
3. Choose **Add repository**.
4. Paste the repository index URL below.
5. Return to Plugins, open **Browse Plugins** with the + button, find BadgeForge, and install it.

Repository index URL:

```
https://raw.githubusercontent.com/tiktoknotificationtroll-wq/Revenge-plugins/gh-pages/index.json
```

The published repository index and package are on the `gh-pages` branch under `index.json` and `pool/`.

## Do not use these
- Do not paste the repository URL into a legacy single-plugin manifest importer.
- Do not use the `legacy/badgeforge` folder URL. It is not a current Revenge plugin repository.
- Do not append a slash to the `index.json` URL.

## BadgeForge limitations
BadgeForge is a local showcase editor. It cannot grant real Discord-issued badges, alter Discord's server-side account creation date, or modify actual game playtime. Custom values are only mock display data within the plugin.

## Source
Current plugin source: `plugins/badgeforge/js/index.tsx`
Manifest: `plugins/badgeforge/manifest.json`
