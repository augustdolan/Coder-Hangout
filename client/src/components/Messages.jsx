import React from 'react';
import UserMessage from './UserMessage.jsx';
const Messages = (props) => {
  return (
    <div>{props.allMessages.map((message) => <UserMessage message={message} />)}</div>
  );
};

export default Messages;