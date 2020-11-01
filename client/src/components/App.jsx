import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Messages from './Messages.jsx';

const socket = io('http://localhost:3000');

const App = (props) => {
  const [ message, setMessage ] = useState('');
  const [ allMessages, setAllMessages ] = useState([]);
  const [ numTest, setNumTest ] = useState(0);
  const allMessagesRef = useRef(allMessages);

  useEffect(() => {
    allMessagesRef.current = allMessages;
  }, [allMessages])

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setAllMessages(allMessagesRef.current.concat(msg))
    })
    return () => socket.disconnect();
  }, [])



  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  }

  return (
    <div>
      <Messages allMessages={allMessages} />
      <form onSubmit={(e, socket) => handleSubmit(e, socket)}>
        <label>
          Message:
          <input type="test" value={message} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;