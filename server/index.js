const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});