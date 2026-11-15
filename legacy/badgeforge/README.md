# BadgeForge install link

Use this GitHub Pages folder URL in Revenge's **Plugins → +** screen, exactly like the Freemoji link:

https://tiktoknotificationtroll-wq.github.io/Revenge-plugins/badgeforge/

Do **not** paste a `raw.githubusercontent.com/.../main/legacy/badgeforge` URL. GitHub's raw host serves files, not folders, so that address returns a 404 / cannot fetch JavaScript.

The published folder is `gh-pages/badgeforge/` and contains:
- `manifest.json`
- `index.js`

The manifest's `main` field points to the compiled `index.js`.
