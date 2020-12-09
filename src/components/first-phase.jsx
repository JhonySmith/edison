import React, { useState } from 'react';
import getPickTimes from '../utils/time.js';

const FirstPhase = (props) => {
  const { userId, dataBase, setConfigStatus } = props;

  const [timeLeft, setTimeLeft] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState(0);

  let alreadyAnswer = true;
  let isID = '';
  let Answers = '';

  // Подписываемся на счетчик ответивших пользователей из БД
  dataBase.ref('event/config/firstPhaseUsers').on('value', (snapshot) => {
    Answers = Object.keys(snapshot.val()).length;
    isID = Object.keys(snapshot.val()).includes(userId);
    console.log(Answers);
    console.log(isID);
  });

  if (!isID) {
    alreadyAnswer = false;
  }

  // Функция отправки информации с ответом и выбраным веременем в БД
  const sendAnswer = () => {
    dataBase.ref('event/config/firstPhaseUsers/' + userId).set({
      time: time,
      event: answer,
    });
  };

  return (
    <section>
      <div>Оставшееся время: {timeLeft / 60000}минут</div>
      <div>Пользователей проголосовало: {Answers}</div>
      <form>
        <label htmlFor="event-time">Выберете время</label>
        <select name="event-time" onChange={(evt) => setTime(evt.target.value)}>
          {getPickTimes().map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label htmlFor="event">Введите мероприятие</label>
        <input
          type="textarea"
          name="event"
          onChange={(evt) => {
            evt.preventDefault();
            setAnswer(evt.target.value);
          }}
        ></input>

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
