import React, { useState } from 'react';
import { ShowingPage } from '../utils/constants.js';

const StartEvent = (props) => {
  const { backServer } = props;

  const [firstPhaseTime, setFirstPhaseTime] = useState('');
  const [secondPhaseTime, setSecondPhaseTime] = useState('');

  return (
    <form>
      <label htmlFor="first-phase">Время 1 фазы (в минутах)</label>
      <input
        type="number"
        name="first-phase"
        onChange={(evt) => setFirstPhaseTime(evt.target.value)}
      ></input>
      <label htmlFor="second-phase">Время 2 фазы (в минутах)</label>
      <input
        type="number"
        name="second-phase"
        onChange={(evt) => setSecondPhaseTime(evt.target.value)}
      ></input>
      <button
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          backServer.post('startEvent', {
            states: ShowingPage,
            timeout: {
              first: firstPhaseTime * 60000,
              second: secondPhaseTime * 60000,
            },
          });
        }}
      >
        Старт
      </button>
    </form>
  );
};

export default StartEvent;