import React, { Component } from 'react';
import Chart from 'chart.js';

export default class MyChart extends Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const { times, lengthTime, answers, answersLength } = this.props;
    console.log(times);
    console.log(lengthTime);
    console.log(answers);
    console.log(answersLength);

    new Chart(myChartRef, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: answersLength,
            labels: answers,
            label: 'chart1',
          },

          {
            data: lengthTime,
            labels: times,
            label: 'chart2',
          },

          {},
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (item, data) {
              var label = data.datasets[item.datasetIndex].labels[item.index];
              var value = data.datasets[item.datasetIndex].data[item.index];
              return label + ': ' + value;
            },
          },
        },
      },
    });
  }

  render() {
    return <canvas ref={this.chartRef}></canvas>;
  }
}