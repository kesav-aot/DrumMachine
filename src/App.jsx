import React, { useState, useEffect } from 'react';
import DrumPad from './Components/Drumpad';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(event.key)) {
        setDisplay(event.key);
        const audio = playSound(event.key);
        setRecord(prevRecord => [...prevRecord, audio]);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const playSound = (key) => {
    const audioFiles = {
      Q: './src/assets/sounds/sound2.wav',
      W: './src/assets/sounds/public_sounds_hihat.wav',
      E: './src/assets/sounds/public_sounds_clap.wav',
      A: './src/assets/sounds/tom.wav',
      S: './src/assets/sounds/public_sounds_kick.wav',
      D: './src/assets/sounds/tom1d.wav',
      Z: './src/assets/sounds/public_sounds_snare.wav',
      X: './src/assets/sounds/sound1.wav',
      C: './src/assets/sounds/public_sounds_sub.wav',
    };

    const audio = new Audio(audioFiles[key]);
    audio.play();
    return audio;
  };

  const handleClick = (event) => {
    const id = event.target.id;
    setDisplay(id);
    const audio = playSound(id);
    setRecord(prevRecord => [...prevRecord, audio]);
  };

  const playRecord = () => {
    record.forEach((audio, index) => {
      setTimeout(() => {
        audio.currentTime = 0; // Reset to the beginning
        audio.play();
      }, index * 500); // Add delay between each sound
    });
  };

  return (
    <div className="main">
      <h1>Drum Machine</h1>
      <div className="drum-machine">
        {['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map(key => (
          <DrumPad key={key} id={key} handleClick={handleClick} />
        ))}
      </div>
      <button className="btn" onClick={playRecord}>Play</button>
    </div>
  );
}

export default App;
