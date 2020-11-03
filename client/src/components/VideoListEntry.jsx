import React from 'react';

const VideoListEntry = (props) => {
  // to do, make the links clickable
  const { snippet } = props.video;

  const handleChange = () => {
    props.socket.emit('current video', props.video.id.videoId)
  }
  return (
    <div onClick={handleChange}>
      <div>{snippet.title}</div>
      <div>{snippet.description}</div>
      <img src={snippet.thumbnails.default.url}></img>
    </div>
  );
}

export default VideoListEntry;