const express = require('express');
const { Pool } = require('pg');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'presentation_app',
  password: 'your_password',
  port: 5432,
});

// HTTP Server
const server = app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('join_presentation', (data) => {
    socket.join(data.presentationId);
  });
  
  socket.on('update_slide', (data) => {
    io.to(data.presentationId).emit('slide_updated', data);
  });
});

// API Routes
app.get('/presentations', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM presentations');
  res.json(rows);
});

app.post('/presentations', async (req, res) => {
  const { title, nickname } = req.body;
  const user = await pool.query(
    'INSERT INTO users (nickname) VALUES ($1) RETURNING *',
    [nickname]
  );
  const presentation = await pool.query(
    'INSERT INTO presentations (title, creator_id) VALUES ($1, $2) RETURNING *',
    [title, user.rows[0].id]
  );
  res.json(presentation.rows[0]);
});