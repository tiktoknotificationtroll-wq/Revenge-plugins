# BadgeForge for classic Revenge

A classic Vendetta-compatible JavaScript plugin for the Revenge Plugins screen shown in older/classic Revenge builds.

## Install

Use the **folder URL** in Revenge → Plugins → + → Install a plugin:

`https://tiktoknotificationtroll-wq.github.io/Revenge-plugins/badgeforge/`

Do not use raw.githubusercontent.com. The classic loader fetches `manifest.json` and then the JavaScript file from the GitHub Pages folder.

GitHub Actions deploys the `docs/` folder to GitHub Pages. Wait for the workflow named **Deploy BadgeForge to GitHub Pages** to finish successfully before installing.

## Features

- Custom local badge labels, with optional Discord-style icon names
- Pretend account-created date shown in a custom badge tooltip
- Game names and pretend hours shown in custom badge tooltips
- Persistent settings in Revenge plugin storage
- Patches only the current user's profile badge hook in the local client

## Important

This is a local visual showcase. It does not grant Discord badges, alter server-side account creation dates, or change real game activity. Other Discord users will not see these mock values. Custom tooltips identify them as local showcase values.
