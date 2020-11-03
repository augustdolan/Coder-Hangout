import React, { useRef, useEffect } from 'react';
import UserMessage from './UserMessage.jsx';
import styled from 'styled-components';

const MessageArea = styled.div`
  height: 50vh;
  bottom: 0;
  overflow-y: auto;
  max-width: 100%;
`;

const Messages = (props) => {

  const MessagesRef = useRef(null);

  const scrollToBottom = () => {
    MessagesRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  useEffect( scrollToBottom, [ props ])


  return (
    <MessageArea>
      {props.allMessages.map((message) => <UserMessage message={message} />)}
      <div ref={MessagesRef}></div>
    </MessageArea>
  );
};

export default Messages;