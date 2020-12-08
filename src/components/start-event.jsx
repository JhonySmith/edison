import React, { useState } from 'react';

const StartEvent = (props) => {
  const { startEventHandler } = props;

  const [firstPhaseTime, setFirstPhaseTime] = useState('');
  const [secondPhaseTime, setSecondPhaseTime] = useState('');

  return (
    <form>
      <label htmlFor="first-phase">Время 1 фазы</label>
      <input
        type="number"
        name="first-phase"
        onChange={(evt) => setFirstPhaseTime(evt.target.value)}
      ></input>
      <label htmlFor="second-phase">Время 2 фазы</label>
      <input
        type="number"
        name="second-phase"
        onChange={(evt) => setSecondPhaseTime(evt.target.value)}
      ></input>
      <button
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          startEventHandler(firstPhaseTime, secondPhaseTime);
        }}
      >
        Старт
      </button>
    </form>
  );
};

export default StartEvent;
