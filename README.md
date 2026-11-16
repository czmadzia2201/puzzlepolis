# Puzzlepolis

A small city of games that make you think — a static landing page for **Futoshiki**, **Dice Game**, **Mastermind**, **Memory**, and **Shape Puzzles**.

## Run locally

No package manager or build step is required. Open `index.html` or run `python3 -m http.server 8000` and visit http://localhost:8000/.

## Railway

Deploy this repository as a Dockerfile service on Railway. The included Caddyfile listens on Railway's `PORT` environment variable (fallback 3000).

The Play buttons use the planned production paths: `/dice/`, `/mastermind/`, `/memory/`, `/futoshiki/`, `/shapepuzzles/`. Routing these paths to the existing game services is **not implemented yet** and will be handled during the deployment iteration.

The site has ordinary whole-page scrolling. The two About panels open native HTML dialogs; their contents are placeholders to replace later.

Game thumbnails are initial vector illustrations; the town banner was cropped from the approved design mockup. Future iterations can replace these assets.
