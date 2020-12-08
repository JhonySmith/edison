import React, { Component } from 'react';
import MyChart from './chart.jsx';

export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};

const FirstPhaseEnd = (props) => {
  const { currentUsers, openSecondFase } = props;

  const times = getUniqArr(Object.values(currentUsers), 'time');

  const lengthTime = [];
  const answers = [];
  const answersLength = [];

  let winAnswer = {
    answer: '',
    count: 0,
    time: '',
  }

  times.forEach((time) => {
    const filteredByTime = Object.values(currentUsers).filter((element) => element.time === time);
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
      <button onClick={(evt) => {
        evt.preventDefault();
        openSecondFase(winAnswer.answer, winAnswer.time);
      }}>Перейти ко 2й фазе</button>
    </div>
  );
};

export default FirstPhaseEnd;
