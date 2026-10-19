# MusicDrop + Vinted Hunter Bot

This repository contains the MusicDrop monitor and Vinted Hunter Discord bot. It runs both monitors in the same Node.js process and posts alerts to configured Discord channels.

## Quick start

1. Set environment variable `DISCORD_TOKEN` on your host (Wispbyte) — do NOT store token in the repo.
2. Ensure Node.js 18+ is used (discord.js and undici require Node >=18).
3. Run:

```bash
npm install
node index.js
```

Or use `watchdog.js` to restart the bot automatically when it crashes:

```bash
node watchdog.js
```

## Files added
- `index.js` — main bot code (MusicDrop + Vinted)
- `watchdog.js` — simple process restarter
- `package.json`, `package-lock.json`
- `config.json` — empty token placeholder
- `utils/` — helper utilities: `logger.js`, `storage.js`, `fetcher.js`, `helpers.js`

## Deploy on Wispbyte
- Create the project and set `DISCORD_TOKEN` in environment variables/secret.
- Set Node version to 18.x.
- Start command: `node index.js` (or use `watchdog.js`).

## Important
- The bot reads/writes data files in the `data/` directory (created automatically). Keep backups if you already have data.
- Test commands `/ping`, `/status`, and `/adminpanel` after deployment (use admin account defined in `index.js` as `ADMIN_ID`).

