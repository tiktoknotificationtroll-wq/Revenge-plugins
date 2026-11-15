# BadgeForge

BadgeForge is a cosmetic profile showcase plugin for the Revenge/Bunny family of Discord clients.

## Install

Paste this GitHub Pages **folder URL** into Revenge → Plugins → +:

`https://tiktoknotificationtroll-wq.github.io/Revenge-plugins/badgeforge/`

This is intentionally the same style as the Freemoji URL:
`https://rico040.github.io/bunny-plugins/freemoji/`

**Do not use** a `raw.githubusercontent.com` directory URL such as `.../main/legacy/badgeforge`. Raw GitHub URLs address individual files, not folders. The published plugin folder is on the `gh-pages` branch and contains `manifest.json` plus the compiled `index.js`.

## Build

The source is in `plugins/badgeforge/`. GitHub Actions compiles the TypeScript/JSX entry point into `dist/badgeforge/index.js`, updates the manifest's `main` field and SHA-256 hash, then publishes `dist/` to the `gh-pages` branch.

## Features

The plugin includes a local settings/preview screen for custom badge labels, a fictional account creation date and mock game playtime. These values are cosmetic and local to this client. They do not grant Discord-issued badges or alter server-side account data.
