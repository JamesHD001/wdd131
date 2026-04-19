const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server starting on ws://localhost:${PORT}`);

// keep a short history so new clients can see recent messages
const history = [];
const HISTORY_LIMIT = 200;

function broadcast(data, sender) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== sender) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws) => {
  // send recent history
  if (history.length) {
    try { ws.send(JSON.stringify(history)); } catch (e) {}
  }

  ws.on('message', (msg) => {
    // try parse JSON
    let data = null;
    try { data = JSON.parse(msg); } catch (e) { return; }

    // attach server timestamp
    data.timestamp = data.timestamp || Date.now();

    // store
    history.push(data);
    if (history.length > HISTORY_LIMIT) history.shift();

    // broadcast to others
    broadcast(data, ws);
  });

  ws.on('close', () => {});
});
