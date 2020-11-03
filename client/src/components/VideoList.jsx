import React from 'react';
import VideoListEntry from './VideoListEntry.jsx'

const VideoList = (props) => {

  return (
   <div>{props.videos.map((video) => <VideoListEntry socket={props.socket} video={video} setCurrentVideo={props.setCurrentVideo} />) }</div>
  );
}

export default VideoList