# MysticPenHD — Modernized Site & Messaging

This workspace contains a modernized front-end for the MysticPenHD site plus a small Node WebSocket server for real-time messaging.

Quick start (dev):

1. Install server dependencies and start WebSocket server:

```bash
cd server
npm install
npm start
```

2. Serve the site files (recommended) so WebSocket works consistently. You can use a simple static server e.g.:

```bash
# using Node's "serve" (install if needed)
npx serve . -p 8080

# or with Python
python -m http.server 8000
```

3. Open `http://localhost:8080/messaging.html` (or the port you used) in your browser.

Notes:
- The messaging client (in `js/messaging.js`) connects to `ws://localhost:3000` by default.
- If you need to expose the server or use cloud-hosted realtime (Pusher/Firebase), update the client accordingly.