# BadgeForge for Revenge

A local-only profile flex editor for Revenge on Android.

## What it does
- Configure custom badge labels (including fictional or parody labels).
- Set a pretend account-created date for the local preview.
- Add game names and playtime strings.
- Preview the result in the plugin's own settings screen.
- Save settings locally on the device.

## Important limitation
BadgeForge currently renders a **local preview inside its settings page**. It does not change Discord's server-side account creation date, game activity, owned badges, or the profile seen by other people. Discord does not expose an API for granting those entitlements. No account tokens are collected or sent anywhere.

## Install
This repository is being prepared as a Revenge plugin source project. The plugin files are in `plugins/badgeforge/`. A packaged ZIP or hosted repository index is required for one-tap installation from Revenge; a normal GitHub repository URL alone is not an installable plugin URL.

## Compatibility
Targets the current Revenge plugin manifest format (format 1) and the Revenge plugin API. Test on a spare client profile first.
