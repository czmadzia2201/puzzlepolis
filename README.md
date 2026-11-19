# Puzzlepolis

A static landing page for games. For now those games are: **Futoshiki**, **Dice**, **Mastermind**, **Memory**, and **Shape Puzzles**. Maybe in the future, some more will be added.

## Run locally

No package manager or build step is required. Open `index.html` or run `python3 -m http.server 8000` and visit http://localhost:8000/.

## Railway

Deploy this repository as a Dockerfile service on Railway. The included Caddyfile listens on Railway's `PORT` environment variable (fallback 3000).