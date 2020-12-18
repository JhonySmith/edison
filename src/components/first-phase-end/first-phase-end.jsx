import React, { useState } from 'react';

import StopEvent from '../stop-event.jsx';
import FinalChart from './final-chart.jsx';

export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};

const FirstPhaseEnd = (props) => {
  const { dataBase, openSecondFase, userId, backServer } = props;
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentUsers, setcurrentUsers] = useState([]);
  const [admin, setAdmin] = useState(0);

  // Подписываемся на счетчик времени из БД
  dataBase.ref('event/config/').on('value', (snapshot) => {
    if (snapshot.val().secondPhaseTimeLeft !== timeLeft) {
      setTimeLeft(snapshot.val().secondPhaseTimeLeft);
    }
  });

  dataBase
    .ref('event/firstPhaseUsers')
    .once('value')
    .then((snapshot) => {
      if (Object.values(snapshot.val()).length !== currentUsers.length) {
        setcurrentUsers(Object.values(snapshot.val()));
      }
    });

  dataBase
    .ref('event/admin')
    .once('value')
    .then((snapshot) => {
      if (admin !== snapshot.val()) {
        setAdmin(snapshot.val());
      }
    });

  let times = getUniqArr(currentUsers, 'time');

  let winAnswer = {
    answer: '',
    count: 0,
    time: '',
  };

  let lengthTime = [];
  let answers = [];
  let answersLength = [];

  times.forEach((time) => {
    const filteredByTime = currentUsers.filter((element) => element.time === time);
    lengthTime.push(filteredByTime.length);
    const uniqAnswer = getUniqArr(filteredByTime, 'event');
    uniqAnswer.forEach((answer) => {
      answers.push(answer);
      const filteredByAnswer = filteredByTime.filter((element) => element.event === answer);
      if (filteredByAnswer.length > winAnswer.count) {
        winAnswer.count = filteredByAnswer.length;
        winAnswer.answer = answer;
        winAnswer.time = time;
      }
      answersLength.push(filteredByAnswer.length);
    });
  });

  return (
    <div>
      <FinalChart />
      <div className="data-text">Выбрано мероприятие: {winAnswer.answer}</div>
      <div className="data-text">Дата проведения: {winAnswer.time}</div>
      <button
        className="button button--auth"
        onClick={(evt) => {
          evt.preventDefault();
          openSecondFase();
        }}
      >
        Перейти ко 2й фазе
      </button>
      {admin === userId ? <StopEvent backServer={backServer} /> : ''}
    </div>
  );
};

export default FirstPhaseEnd;
