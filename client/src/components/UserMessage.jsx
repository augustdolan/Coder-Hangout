import React from 'react';

const UserMessage = (props) => {
  console.log(props.message);
  return (
      <div>{ props.message }</div>
  );
};
export default UserMessage;