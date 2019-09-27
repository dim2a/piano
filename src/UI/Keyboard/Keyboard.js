import React, { Component } from 'react';
import styled from 'styled-components';
import Tone from 'tone';

class Keyboard extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.buttonHandlerDown);
    document.addEventListener('keyup', this.buttonHandlerUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.buttonHandler);
  }

  buttonHandlerUp = e => {
    e.preventDefault();
    const { keys } = this.props;
    const btn = keys.filter(key => key.key === e.key);
    if (btn[0]) {
      const el = document.getElementById(`${btn[0].id}`);
      el.style.transform = `translate(${btn[0].position * 40}px, 100px)`;
    }
  };

  buttonHandlerDown = e => {
    e.preventDefault();
    const { keys } = this.props;
    const btn = keys.filter(key => key.key === e.key);

    if (btn[0]) {
      const el = document.getElementById(`${btn[0].id}`);
      el.style.transform = `translate(${btn[0].position * 40}px, 105px)`;
      this.sound(btn[0].name);
    }
  };

  sound(name) {
    const synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(name, '8n');
  }

  clickHandler = e => {
    const name = e.target.getAttribute('value');
    this.sound(name);
  };

  renderKeys(keys) {
    return keys.map(({ id, position, name, height, key }) => (
      <Key
        id={id}
        key={position}
        position={position}
        value={name}
        height={height}
        onClick={this.clickHandler}
      >
        {key}
      </Key>
    ));
  }

  render() {
    const { keys } = this.props;
    return <KeyboardTag>{this.renderKeys(keys)}</KeyboardTag>;
  }
}

const KeyboardTag = styled.div`
  position: relative;
  width: 800px;
  margin: 100px auto;
`;
const Key = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 5px;
  

  height: ${({ height }) => height * 200}px;
  width: ${({ height }) => (height === 0.8 ? '30' : '40')}px;
  border: 1px solid black;
  color: ${({ height }) => (height === 0.8 ? '#fff' : '#000')};
  transform: translate(${({ position }) => position * 40}px, 100px);
  background-color: ${({ height }) => (height === 0.8 ? '#000' : '#fff')};
  z-index: ${({ height }) => (height === 0.8 ? '2' : '1')}
  box-shadow: inset 1px 1px 7px 0px rgba(0, 0, 0, 1),
    inset -1px -1px 7px 0px rgba(0, 0, 0, 1), 1px 0px gray, -1px 0px gray;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: inset 1px 1px 7px 0px rgba(0, 0, 0, 1),
    inset -1px -1px 17px 0px rgba(0, 0, 0, 1), 1px 0px gray, -1px 0px gray;
    transform: translate(${({ position }) => position * 40}px, 105px);
  }
`;

export default Keyboard;
