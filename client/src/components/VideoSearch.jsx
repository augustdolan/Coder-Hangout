import React, { useState } from 'react';
import axios from 'axios';

const VideoSearch = (props) => {
  const [ query, setQuery ] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('/api/youtube', {
      params: {
        query: query
      }
    })
    setQuery('');
  }

  return (
    <form onSubmit={ (e) => { handleSubmit(e) }}>
      <label>
        Youtube Search:
        <input type="youtube-search" value={query} onChange={(e) => handleChange(e)} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
};


export default VideoSearch;