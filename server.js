const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK', server: 'MyServer', version: '1.0.1', timestamp: new Date() });
});

io.on('connection', (socket) => {
    console.log(`A new client has connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});