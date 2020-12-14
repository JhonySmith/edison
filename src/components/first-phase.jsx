import React, { useState } from 'react';
import getPickTimes from '../utils/time.js';
import StopEvent from './stop-event.jsx';
import Autocomplete from './autocomplete';

const FirstPhase = (props) => {
  const { userId, dataBase, backServer } = props;

  const [timeLeft, setTimeLeft] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [choosenTime, setChoosenTime] = useState(0);
  const [choosenEvent, setChoosenEvent] = useState(0);
  const [firstPhaseUsers, setFirstPhaseUsers] = useState([]);
  const [notValid, setNotValid] = useState(false);
  const [admin, setAdmin] = useState(0);

  const alreadyAnswer = firstPhaseUsers.includes(userId);

  dataBase
    .ref('event/admin')
    .once('value')
    .then((snapshot) => {
      if (admin !== snapshot.val()) {
        setAdmin(snapshot.val());
      }
    });

  // Подписываемся на счетчик ответивших пользователей из БД
  dataBase.ref('event/firstPhaseUsers').on('value', (snapshot) => {
    let firstPhaseUsersNew = Object.keys(snapshot.val());
    if (firstPhaseUsers.length !== firstPhaseUsersNew.length) {
      setFirstPhaseUsers(firstPhaseUsersNew);
      setUsersCount(firstPhaseUsersNew.length);
    }
  });

  // Подписываемся на счетчик оставшегося времени из БД
  dataBase.ref('event/config/firstPhaseTimeLeft').on('value', (snapshot) => {
    if (timeLeft !== snapshot.val()) {
      setTimeLeft(snapshot.val());
    }
  });

  // Функция отправки информации с ответом и выбраным веременем в БД
  const sendAnswer = () => {
    dataBase.ref('event/firstPhaseUsers/' + userId).set({
      time: choosenTime,
      event: choosenEvent,
    });
  };

  const validateForm = () => {
    if (choosenEvent && choosenTime) {
      sendAnswer();
    } else {
      setNotValid('Вы заполнили не все поля');
    }
  };

  return (
    <section>
      <div className="indicator-block">
        <div className="indicator-name">
          Оставшееся время: <span className="indicator">{timeLeft / 60000} мин.</span>
        </div>
        <div className="indicator-name">
          Пользователей проголосовало: <span className="indicator">{usersCount}</span>
        </div>
      </div>
      <form className="form form--auth">
        <label className="label label--auth" htmlFor="event-time">
          Выберете время:
          <select
            className="input input--auth"
            name="event-time"
            onChange={(evt) => setChoosenTime(evt.target.value)}
          >
            {getPickTimes().map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
        <label className="label label--auth" htmlFor="event">
          Введите мероприятие:
          <input
            className="input input--auth"
            type="textarea"
            name="event"
            onChange={(evt) => setChoosenEvent(evt.target.value)}
          ></input>
        </label>
        <Autocomplete dataBase={dataBase} />
        <button
          className="button button--auth"
          disabled={alreadyAnswer}
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            validateForm();
          }}
        >
          {alreadyAnswer ? 'Отправлено' : 'Отправить'}
        </button>
        <div className="error-message">{notValid}</div>
      </form>
      {admin === userId ? <StopEvent backServer={backServer} /> : ''}
    </section>
  );
};

export default FirstPhase;
