import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import VideoSearch from './VideoSearch.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import VideoList from './VideoList.jsx';
import Messages from './Messages.jsx';
import InputUsername from './InputUsername.jsx';
const socket = io();

const ViewerExperienceFlex = styled.div`
  display: flex;
  wrap: wrap;
`;

const ChatFlex = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  position: absolute;
  width: 33%;
  right: 0;
  top: 0;
`;

const App = (props) => {
  const [ username, setUsername ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ allMessages, setAllMessages ] = useState([]);
  const [ videos, setVideos ] = useState([])
  const [ currentVideo, setCurrentVideo ] = useState({})
  const allMessagesRef = useRef(allMessages);
  const videosRef = useRef(videos);

  useEffect(() => {
    allMessagesRef.current = allMessages;
    videosRef.current = videos;
  }, [allMessages, videos])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setAllMessages(allMessagesRef.current.concat(msg))
    })
    socket.on('youtube videos', (videos) => {
      setVideos(videos);
      setCurrentVideo(videos[0].id.videoId)
    })
    socket.on('current video', (video) => {
      setCurrentVideo(video);
    })
    return () => socket.disconnect();
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', username + ': ' + message);
    setMessage('');
  }

  return (
    <div>
      {!username && <InputUsername setUsername={setUsername} />}
      <ViewerExperienceFlex>
        <div>
          <VideoSearch />
          <VideoPlayer currentVideo={currentVideo} />
        </div>
          <ChatFlex>
            <Messages allMessages={allMessages} />
            <form onSubmit={(e, socket) => handleSubmit(e, socket)}>
              <label>
                Message:
                <input type="text" value={message} onChange={handleChange} />
              </label>
              <input type="submit" value="Send" />
            </form>
          </ChatFlex>
      </ViewerExperienceFlex>
      <VideoList socket={socket} videos={videos} setCurrentVideo={setCurrentVideo} />

    </div>
  );
}

export default App;