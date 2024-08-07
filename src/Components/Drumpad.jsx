import React from 'react';


const DrumPad = ({ id, handleClick }) => {
  return (
    <div className="drum-pad" id={id}>
      <img
        src={`./assets/icon${id}.png`}
        alt={`${id} drum pad`}
        onClick={handleClick}
        id={id}
      />
      <span className="key-label">{id}</span>
    </div>
  );
};

export default DrumPad;
