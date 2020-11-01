const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});