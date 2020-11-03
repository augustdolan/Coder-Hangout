import React from 'react';
import styled from 'styled-components';

const CoverAll = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: white;
`;

const InputUsername = (props) => {

  const [ value, setValue ] = React.useState('');

  const handleSubmit = (e) => {
    props.setUsername(value);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  return (
    <CoverAll>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Submit Username to Watch Youtube :):
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Send" />
      </form>
    </CoverAll>
  );
}

export default InputUsername;