import React, { useState } from 'react';

import getUniqArr from '../../utils/getUniqArr';

import StopEvent from '../stop-event.jsx';
import FinalChart from './final-chart.jsx';
import NextPhaseButton from './next-phase-button.jsx';

const FirstPhaseEnd = (props) => {
  const { dataBase, openSecondFase, userId, backServer } = props;
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentUsers, setcurrentUsers] = useState([]);
  const [admin, setAdmin] = useState(0);

  dataBase
    .ref('event/firstPhaseUsers')
    .once('value')
    .then((snapshot) => {
      if (Object.values(snapshot.val()).length !== currentUsers.length) {
        setcurrentUsers(Object.values(snapshot.val()));
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

  // Проходим по каждому уникальному выбранному времени
  times.forEach((time) => {
    // Отбираем пользователей выбравших данное время, для того чтобы понимать сколько всего ответов на данное время
    const filteredByTime = currentUsers.filter((element) => element.time === time);
    // Пушим количество ответов пользователей в массив для дальнейшего построения диаграммы
    lengthTime.push(filteredByTime.length);
    // Отбираем уникальные события в заданное время
    const uniqAnswer = getUniqArr(filteredByTime, 'event');
    // Проходим по каждому уникальнму событию в текущее время
    uniqAnswer.forEach((answer) => {
      // Пушим в массив ответов для построения диаграммы
      answers.push(answer);
      // Получаем связку время и количество пользователей выбраших данное событие
      const filteredByAnswer = filteredByTime.filter((element) => element.event === answer);
      // Проверяем если количество проголосовавших за больше чем наибольшее
      if (filteredByAnswer.length > winAnswer.count) {
        // Если так, текущее событие в выбранное время становится победителем
        winAnswer.count = filteredByAnswer.length;
        winAnswer.answer = answer;
        winAnswer.time = time;
      }
      // Пушим количество ответов по заданному событию и времени для построения диаграммы
      answersLength.push(filteredByAnswer.length);
    });
  });

  return (
    <div>
      <FinalChart />
      <div className="data-text">Выбрано мероприятие: {winAnswer.answer}</div>
      <div className="data-text">Дата проведения: {winAnswer.time}</div>
      <NextPhaseButton />
      {admin === userId ? <StopEvent backServer={backServer} /> : ''}
    </div>
  );
};

export default FirstPhaseEnd;
