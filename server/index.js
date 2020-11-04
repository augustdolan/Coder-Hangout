const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const path = require('path');
let youtubeVideos = require('../youtubeVideos.js');

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(express.json())


io.on('connection', (socket) => {
  io.emit('chat message', 'Press play on youtube to start the shared experience!');
  io.emit('youtube videos', youtubeVideos)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    io.emit('chat message', 'smell ya later LOSER');
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
    res.status(403).send('an error occurred querying youtube')
  })
})