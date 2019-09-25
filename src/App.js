import React from 'react';
import './App.css';
import Keyboard from './UI/Keyboard/Keyboard'
import {keys} from './keys'

function App() {
  return (
    <div className="App">
      <h1>Piano</h1>
      <Keyboard keys={keys}/>
    </div>
  );
}

export default App;
