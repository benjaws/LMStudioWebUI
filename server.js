


require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ... après l'initialisation de app ...

const db = new sqlite3.Database('chats.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY,
    name TEXT,
    folder TEXT DEFAULT 'Default'
  )`);
  db.run(`ALTER TABLE conversations ADD COLUMN folder TEXT DEFAULT 'Default'`, err => {});
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER,
    sender TEXT,
    content TEXT,
    metrics TEXT,
    is_image INTEGER DEFAULT 0,
    image_data TEXT,
    FOREIGN KEY(conversation_id) REFERENCES conversations(id)
  )`);
});

const app = express();
app.use(express.json({limit: '10mb'}));
// Allow serving dotfiles so the frontend can fetch the .env configuration
app.use(express.static(path.join(__dirname), { dotfiles: 'allow' }));

// Return all chats with their messages
app.get('/api/chats', (req, res) => {
  db.all(`SELECT * FROM conversations`, [], (err, conversations) => {
    if (err) return res.status(500).json({ error: err.message });
    const tasks = conversations.map(c => new Promise((resolve, reject) => {
      db.all(`SELECT sender, content, metrics, is_image as isImage, image_data as imageData FROM messages WHERE conversation_id=? ORDER BY id`, [c.id], (err2, msgs) => {
        if (err2) reject(err2);
        else resolve({ id: c.id, name: c.name, folder: c.folder, messages: msgs });
      });
    }));
    Promise.all(tasks)
      .then(result => res.json(result))
      .catch(e => res.status(500).json({ error: e.message }));
  });
});

// Save or update a chat
app.post('/api/chats', (req, res) => {
  const chat = req.body;
  if (!chat || !chat.id) return res.status(400).json({ error: 'Invalid chat' });
  db.serialize(() => {
    db.run(`INSERT OR REPLACE INTO conversations(id, name, folder) VALUES(?, ?, ?)`, [chat.id, chat.name || 'Conversation', chat.folder || 'Default'], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      db.run(`DELETE FROM messages WHERE conversation_id=?`, [chat.id], (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });
        const stmt = db.prepare(`INSERT INTO messages(conversation_id, sender, content, metrics, is_image, image_data) VALUES (?, ?, ?, ?, ?, ?)`);
        chat.messages.forEach(m => {
          stmt.run(chat.id, m.isUser ? 'user' : 'assistant', m.content, m.metrics || null, m.isImage ? 1 : 0, m.isImage ? m.imageData || null : null);
        });
        stmt.finalize(err3 => {
          if (err3) return res.status(500).json({ error: err3.message });
          res.json({ status: 'ok' });
        });
      });
    });
  });
});

// Delete a chat
app.delete('/api/chats/:id', (req, res) => {
  const id = req.params.id;
  db.serialize(() => {
    db.run(`DELETE FROM messages WHERE conversation_id=?`, [id]);
    db.run(`DELETE FROM conversations WHERE id=?`, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ status: 'ok' });
    });
  });
});

// Endpoint pour exposer la config au front-end (sans exposer AUTH_TOKEN)
app.get('/config', (req, res) => {
  res.json({
    SERVER_URL: process.env.SERVER_URL || ''
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
