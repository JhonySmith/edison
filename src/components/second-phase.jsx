import React, { Component } from 'react';
import Chart from 'chart.js';

const SecondPhase = (props) => {
  const {eventWinner, timeWinner} = props;

  return <div>
    Вы согласны с мероприятием:"{eventWinner}" в {timeWinner}?
    <button>
      Согласиться
    </button>
    <button>
      Отказаться
    </button>

  </div>;
};

export default SecondPhase;
