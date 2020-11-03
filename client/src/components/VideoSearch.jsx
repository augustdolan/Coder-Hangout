import React, { useState } from 'react';
import axios from 'axios';

const VideoSearch = (props) => {
  const [ query, setQuery ] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(query);
  }
  const handleSubmit = () => {
    console.log('here is query', query)
    axios.get('/api/youtube', {
      params: {
        query: query
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Youtube Search:
        <input type="youtube-search" value={query} onChange={(e) => handleChange(e)} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
};


export default VideoSearch;