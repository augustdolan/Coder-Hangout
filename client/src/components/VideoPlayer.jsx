import React from 'react';

const VideoPlayer = (props) => {

  return (
    <iframe id="player" width="1120" height="630" src={`https://www.youtube.com/embed/${props.currentVideo}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay="1" mute="1"></iframe>
  );
}

export default VideoPlayer;