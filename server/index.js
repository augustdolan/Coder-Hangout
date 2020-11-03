const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;
const axios = require('axios');
const path = require('path');
let youtubeVideos = require('../youtubeVideos.js');

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(express.json())


io.on('connection', (socket) => {
  io.emit('chat message', 'Welcome to the hangout, enjoy your stay :)')
  io.emit('youtube videos', youtubeVideos)
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
  socket.on('current video', (video) => {
    io.emit('current video', video)
  })
})

http.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
});

app.get('/api/youtube', (req, res) => {
  const { query } = req.query;
  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      key: process.env.API_KEY,
      q: query
    }
  })
  .then((results) => {
    youtubeVideos = results.data.items;
    io.emit('youtube videos', youtubeVideos)
    res.status(200).end();
  })
  .catch((err) => {
    console.log(err);
    res.status(403).send('an error occurred querying youtube')
  })
})