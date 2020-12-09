import React, { Component, useState } from 'react';
import MyChart from './chart.jsx';

export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};

const FirstPhaseEnd = (props) => {
  const { setConfigStatus, dataBase, openSecondFase } = props;
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentUsers, setcurrentUsers] = useState('');

  // Подписываемся на счетчик времени из БД
  dataBase.ref('event/config/').on('value', (snapshot) => {
    setTimeLeft(snapshot.val().secondPhaseTimeLeft);

    // Обновляем общее отображение приложения, если сервер ответил что событие уже закончилось
    if (snapshot.val().secondPhaseTimeLeft <= 0) {
      setConfigStatus();
    }
  });

  dataBase.ref('event/config/firstPhaseUsers').on('value', (snapshot) => {
    setcurrentUsers(Object.values(snapshot.val()));
  });

  const times = getUniqArr(currentUsers, 'time');

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
    const uniqAnswer = getUniqArr(filteredByTime, 'answer');
    uniqAnswer.forEach((answer) => {
      answers.push(answer);
      const filteredByAnswer = filteredByTime.filter((element) => element.answer === answer);
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
