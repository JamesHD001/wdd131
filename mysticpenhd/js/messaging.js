/* Simple client for WebSocket chat server
   - Connects to ws://localhost:3000
   - Sends/receives JSON messages: {name,text,author,timestamp}
   - Falls back to local-only echo if server unavailable
*/
(function () {
    const WS_URL = 'ws://localhost:3000';
    const messagesEl = document.getElementById('messages');
    const form = document.getElementById('chatForm');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const asAuthor = document.getElementById('asAuthor');

    let ws;
    let connected = false;

    function appendMessage(msg, isOwn = false) {
        if (!messagesEl) return;
        const el = document.createElement('div');
        el.className = 'message' + (isOwn ? ' mine' : '') + (msg.author ? ' author' : ' reader');
        const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString();
        el.innerHTML = `<div class="msg-head"><strong>${escapeHtml(msg.name)}</strong> <span class="time">${time}</span></div>
                        <div class="msg-body">${escapeHtml(msg.text)}</div>`;
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (m) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m];
        });
    }

    function connect() {
        try {
            ws = new WebSocket(WS_URL);

            ws.addEventListener('open', () => {
                connected = true;
                appendMessage({name: 'System', text: 'Connected to chat server', timestamp: Date.now(), author: false});
            });

            ws.addEventListener('message', (ev) => {
                try {
                    const data = JSON.parse(ev.data);
                    if (Array.isArray(data)) {
                        data.forEach(m => appendMessage(m, false));
                    } else appendMessage(data, false);
                } catch (e) {
                    // ignore non-json
                }
            });

            ws.addEventListener('close', () => {
                connected = false;
                appendMessage({name: 'System', text: 'Disconnected from server. Messages will be local-only.', timestamp: Date.now(), author: false});
            });

            ws.addEventListener('error', () => {
                connected = false;
            });
        } catch (e) {
            connected = false;
        }
    }

    form && form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim() || 'Anonymous';
        const text = messageInput.value.trim();
        if (!text) return;
        const msg = {name, text, author: !!asAuthor.checked, timestamp: Date.now()};

        // send via WebSocket if available
        if (connected && ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(msg));
            appendMessage(msg, true);
        } else {
            // local echo (fallback)
            appendMessage(msg, true);
        }

        messageInput.value = '';
        messageInput.focus();
    });

    // initial connect
    connect();

    // Try reconnecting occasionally
    setInterval(() => {
        if (!connected) connect();
    }, 5000);

})();
