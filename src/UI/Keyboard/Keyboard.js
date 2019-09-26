import React, { Component } from 'react';
import styled from 'styled-components';
import Tone from 'tone';

class Keyboard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.sound = this.sound.bind(this);
  //   this.positionCalc = this.positionCalc.bind(this);
  // }
  componentDidMount() {
    document.addEventListener('keydown', this.buttonHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.buttonHandler);
  }

  buttonHandler = e => {
    e.preventDefault();
    const { keys } = this.props;
    const btn = keys.filter(key => key.key === e.key);
    if (btn[0]) {
      this.sound(btn[0].name);
    }
  };

  sound(name) {
    console.log('sound');
    const synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(name, '8n');
  }

  clickHandler = e => {
    const name = e.target.getAttribute('value');
    this.sound(name);
  };

  renderKeys(keys) {
    // const whiteKeys = keys.filter(key => key.height === 1);
    // const blackKeys = keys.filter(key => key.height === 0.8);
    // console.log('white: ', whiteKeys);
    // console.log('black: ', blackKeys);
    return keys.map(({ position, name, height, key }) => (
      <Key
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

  // positionCalc = (id, height) => {
  //   return id * 40;
  // };

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
    transform: translate(${({ position }) => position * 40}px, 105px);
  }
`;

export default Keyboard;
//transform: translate(${({ id, height }) => height === 0.8 ? ((id-1) * 50) + 25 : ((id-1) * 50)+25}px, 100px);
//transform: translate(${({ id }) => id * 40}px, 100px);
