import React from 'react';
import styled from 'styled-components';
import Tone from 'tone';

const Keyboard = props => {
  const clickHandler = e => {
    const name = e.target.getAttribute('value');

    const synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(name, '8n');
  };

  const renderKeys = keys => {
    return keys.map(({ id, name, height }) => (
      <Key
        key={id}
        id={id}
        value={name}
        height={height}
        onClick={clickHandler}
      ></Key>
    ));
  };

  const { keys } = props;
  console.log(keys);
  return <KeyboardTag>{renderKeys(keys)}</KeyboardTag>;
};

const KeyboardTag = styled.div`
  position: relative;
  width: 1000px;
  margin: 100px auto;
`;
const Key = styled.div`
  position: absolute;
  height: ${({ height }) => height * 200}px;
  width: 40px;
  border: 1px solid black;
  transform: translate(${({ id }) => id * 40}px, 100px);
  background-color: ${({ height }) => (height === 0.8 ? '#000' : '#fff')};
  &:hover {
    cursor: pointer;
  }
  &:active {
    border: 3px solid red;
  }
`;

export default Keyboard;
//transform: translate(${({ id, height }) => height === 0.8 ? ((id-1) * 50) + 25 : ((id-1) * 50)+25}px, 100px);
