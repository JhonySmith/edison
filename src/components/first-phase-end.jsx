import React, { Component } from 'react';
import MyChart from './chart.jsx';

export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};

const FirstPhaseEnd = (props) => {
  const { currentUsers } = props;

  const times = getUniqArr(Object.values(currentUsers), 'time');

  const lengthTime = [];
  const answers = [];
  const answersLength = [];

  times.forEach((time) => {
    const filteredByTime = Object.values(currentUsers).filter((element) => element.time === time);
    lengthTime.push(filteredByTime.length);
    const uniqAnswer = getUniqArr(filteredByTime, 'answer');
    uniqAnswer.forEach((answer) => {
      answers.push(answer);
      const filteredByAnswer = filteredByTime.filter((element) => element.answer === answer);
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
    </div>
  );
};

export default FirstPhaseEnd;
