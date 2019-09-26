import React, { Component } from 'react';
import styled from 'styled-components';
import Tone from 'tone';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.sound = this.sound.bind(this);
  }
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
    console.log(btn[0]);
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
    return keys.map(({ id, name, height, key }) => (
      <Key
        key={id}
        id={id}
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
  width: 1000px;
  margin: 100px auto;
`;
const Key = styled.div`
  position: absolute;
  height: ${({ height }) => height * 200}px;
  width: 40px;
  border: 1px solid black;
  color: ${({ height }) => (height === 0.8 ? '#fff' : '#000')}
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
