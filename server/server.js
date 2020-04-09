const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has entered the chat` });
    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (msg, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: msg });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(router);
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
