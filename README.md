# BadgeForge for Revenge

A local-only profile flex editor for Revenge on Android.

## Features
- Custom badge labels, including fictional or parody labels.
- Pretend account-created date for the local preview.
- Custom game names and playtime strings.
- Live profile showcase preview in the plugin settings screen.
- Settings saved locally on the device.

## Important limitation
BadgeForge currently renders a **local preview inside its own settings page**. It does not grant Discord badges, alter the server-side account creation date or playtime, or make those mock values visible to other Discord users. Discord does not expose an API for granting those entitlements. The plugin does not collect or transmit account tokens.

## Install
The GitHub Actions workflow builds the plugin ZIP and publishes a static Revenge repository to the `gh-pages` branch.

After the first successful workflow run, add this repository URL in Revenge:
```
https://raw.githubusercontent.com/tiktoknotificationtroll-wq/Revenge-plugins/gh-pages/index.json
```

In Revenge: Settings → Revenge → Plugins → settings gear → Add repository. Then browse for **BadgeForge** and install it.

If the repository URL returns 404, open the Actions tab and check that **Build and publish BadgeForge repository** has completed successfully. The first run needs to publish the `gh-pages` branch.

## Source
Plugin source: `plugins/badgeforge/index.js`
Manifest: `plugins/badgeforge/manifest.json`
