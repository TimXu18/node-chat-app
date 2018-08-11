const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

// io is websocket server
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected.');

    const datetime = new Date().toLocaleString();
    socket.emit('newMessage', {
        from: 'tim',
        text: 'Hi there',
        createdAt: datetime
    });

    socket.on('createMessage', newMessage => {
        console.log('createMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

console.log(publicPath);