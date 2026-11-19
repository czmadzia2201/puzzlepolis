# Puzzlepolis

A static homepage for five browser games: **Futoshiki**, **Dice**, **Mastermind**, **Memory**, and **Shape Puzzles**. The games are deployed separately and linked through the routes defined in `Caddyfile`.

## Run locally

No build step or dependencies are required for the page itself. From the project root, start a local HTTP server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/.

Opening `index.html` directly (`file://`) may display the page, but the **About** dialogs will not load correctly: their content is fetched from separate HTML files in `about/`. The game links also require the reverse-proxy routes configured in Caddy and will not work with the simple local server.

## Railway

The `Caddyfile` serves the homepage and reverse-proxies `/dice/`, `/futoshiki/`, `/mastermind/`, `/memory/`, and `/shape-puzzles/` to the corresponding frontends. Caddy listens on Railway's `PORT` variable (default: `3000`).
