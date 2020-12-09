import React, { Component, useState } from 'react';
import MyChart from './chart.jsx';

export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};

const FirstPhaseEnd = (props) => {
  const { setConfigStatus, dataBase, openSecondFase } = props;
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentUsers, setcurrentUsers] = useState([]);

  // Подписываемся на счетчик времени из БД
  dataBase.ref('event/config/').on('value', (snapshot) => {
    if (snapshot.val().secondPhaseTimeLeft !== timeLeft) {
      setTimeLeft(snapshot.val().secondPhaseTimeLeft);
    }
  });

  dataBase.ref('event/firstPhaseUsers').on('value', (snapshot) => {
    if (Object.values(snapshot.val()).length !== currentUsers.length) {
      setcurrentUsers(Object.values(snapshot.val()));
      console.log(Object.values(snapshot.val()));
    }
  });

  const times = getUniqArr(currentUsers, 'time');
  console.log(times);

  const lengthTime = [];
  const answers = [];
  const answersLength = [];

  let winAnswer = {
    answer: '',
    count: 0,
    time: '',
  };

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

  console.log(lengthTime);

  return (
    <div>
      <MyChart
        times={times}
        lengthTime={lengthTime}
        answers={answers}
        answersLength={answersLength}
      />
      <div>Выбрано мероприятие: {winAnswer.answer}</div>
      <div>Дата проведения: {winAnswer.time}</div>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          openSecondFase();
        }}
      >
        Перейти ко 2й фазе
      </button>
    </div>
  );
};

export default FirstPhaseEnd;
