import React, { useState } from 'react';
import getPickTimes from '../utils/time.js';

const FirstPhase = (props) => {
  const { userId, dataBase } = props;

  const [timeLeft, setTimeLeft] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [firstPhaseUsers, setFirstPhaseUsers] = useState([]);

  const timeRef = React.createRef();
  const eventRef = React.createRef();

  const alreadyAnswer = firstPhaseUsers.includes(userId);

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
      time: timeRef.current.value,
      event: eventRef.current.value,
    });
  };

  return (
    <section>
      <div>Оставшееся время: {timeLeft / 60000} мин.</div>
      <div>Пользователей проголосовало: {usersCount}</div>
      <form>
        <label htmlFor="event-time">Выберете время</label>
        <select name="event-time" ref={timeRef}>
          {getPickTimes().map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <label htmlFor="event">Введите мероприятие</label>
        <input type="textarea" name="event" ref={eventRef}></input>

        <button
          disabled={alreadyAnswer}
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            sendAnswer();
          }}
        >
          {alreadyAnswer ? 'Уже отправлено' : 'Отправить'}
        </button>
      </form>
    </section>
  );
};

export default FirstPhase;
