const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', reason => {
    console.log('user disconnected');
  });

  socket.on('room', data => {
    console.log('room join');
    console.log(data);
    socket.join(data.room);
  });

  socket.on('leave room', data => {
    console.log('leaving room');
    console.log(data);
    socket.leave(data.room)
  });

  socket.on('new message', data => {
    console.log(data.room);
    socket.broadcast
    .to(data.room)
    .emit('receive message', data)
  });
});

http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});