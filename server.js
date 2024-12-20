const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();
const forgotPasswordRoutes = require('./routes/forgotpasswordRoutes');
const resetPasswordRoutes = require('./routes/resetpasswordRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up HTTP server
const server = http.createServer(app);

// Set up WebSocket server using the same server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message);
  });
  ws.send('Welcome to the WebSocket server');
});

// Use routes
app.use('/api/auth/forgotpassword', forgotPasswordRoutes);
app.use('/api/auth/resetpassword', resetPasswordRoutes);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
