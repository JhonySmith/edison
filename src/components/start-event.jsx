import React, { useState } from 'react';
import { ShowingPage } from '../utils/constants.js';

const StartEvent = (props) => {
  const { backServer, dataBase, currentUserID } = props;

  const [firstPhaseTime, setFirstPhaseTime] = useState('');
  const [secondPhaseTime, setSecondPhaseTime] = useState('');
  const [notValid, setNotValid] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  // Запускает событие на сервере
  const startEvent = () => {
    backServer.post('startEvent', {
      admin: currentUserID,
      states: ShowingPage,
      timeout: {
        first: firstPhaseTime * 60000,
        second: secondPhaseTime * 60000,
      },
    });
  };

  const startButtonRef = React.createRef();

  const validateForm = () => {
    dataBase
      .ref('event/config/phase')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() !== 'startEvent') {
          setNotValid('Кто то уже запустил голосование');
        } else if (!firstPhaseTime || !secondPhaseTime) {
          setNotValid('Вы ввели не все данные');
        } else {
          startEvent();
        }
        setbuttonDisabled(false);
      });
  };

  return (
    <form className="form form--auth">
      <label className="label label--auth" htmlFor="first-phase">
        Время 1 фазы (в минутах)
      </label>
      <input
        className="input input--start-event"
        type="number"
        name="first-phase"
        onChange={(evt) => setFirstPhaseTime(evt.target.value)}
      ></input>
      <label className="label label--auth" htmlFor="second-phase">
        Время 2 фазы (в минутах)
      </label>
      <input
        className="input input--start-event"
        type="number"
        name="second-phase"
        onChange={(evt) => setSecondPhaseTime(evt.target.value)}
      ></input>
      <button
        ref={startButtonRef}
        className="button button--auth"
        type="button"
        onClick={(evt) => {
          evt.preventDefault();
          validateForm();
        }}
        disabled={buttonDisabled}
      >
        Старт
      </button>
      <div className="error-message">{notValid}</div>
    </form>
  );
};

export default StartEvent;
