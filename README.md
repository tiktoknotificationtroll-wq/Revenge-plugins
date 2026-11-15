# BadgeForge

A Vendetta/Bunny-style JavaScript plugin for Revenge, following the same folder-per-plugin layout as Rico040's Bunny plugin repository.

## Install

Paste this exact GitHub Pages plugin folder URL into **Revenge → Plugins → +**:

`https://tiktoknotificationtroll-wq.github.io/Revenge-plugins/badgeforge/`

The folder contains the generated `manifest.json` and `index.js` bundle. Do not use a raw.githubusercontent.com URL, a repository index URL, or the source folder under `plugins/`.

## Build

The GitHub Actions workflow builds `plugins/badgeforge/manifest.json` and `plugins/badgeforge/src/index.tsx` into `dist/badgeforge/`, then publishes `dist/` to the `gh-pages` branch.

## Features

- Locally configurable profile tags
- Optional pretend account creation date
- Game names with mock playtime values
- Settings persist in plugin storage

All values are cosmetic and local to this client. They do not change Discord's server-side account data, issue official badges, or appear to other users viewing the profile.
