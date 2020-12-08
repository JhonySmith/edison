import React, { useState } from 'react';
import getPickTimes from '../utils/time.js';

const FirstPhase = (props) => {
  const {
    timeLeftFirstPhase,
    firstPhaseUsers,
    user,
    firstPhaseEndHandler,
    firstPhaseNewAnswerHandler,
  } = props;

  const [time, setTime] = useState('');
  const [event, setEvent] = useState('');

  if (timeLeftFirstPhase <= 0) {
    firstPhaseEndHandler();
  }

  const alredyAnswer = firstPhaseUsers.includes(user.split('@')[0]);

  return (
    <section>
      <div>Оставшееся время: {timeLeftFirstPhase}минут</div>
      <div>Пользователей проголосовало: {firstPhaseUsers.length}</div>
      <form>
        <label htmlFor="event-time">Выберете время</label>
        <select name="event-time" onChange={(evt) => setTime(evt.target.value)}>
          {getPickTimes().map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label htmlFor="event">Введите мероприятие</label>
        <input type="textarea" name="event" onChange={(evt) => setEvent(evt.target.value)}></input>

        <button
          disabled={alredyAnswer ? true : false}
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            firstPhaseNewAnswerHandler(time, event);
          }}
        >
          {alredyAnswer ? 'Уже отправлено' : 'Отправить'}
        </button>
      </form>
    </section>
  );
};

export default FirstPhase;
