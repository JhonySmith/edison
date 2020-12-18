import { Pie } from 'react-chartjs-2';

const FinalChart = (props) => {
  const { answersLength, answers, lengthTime, times } = props;

  const datasetKeyProvider = () => {
    return Math.random();
  };

  return (
    <Pie
      data={{
        datasets: [
          {
            data: answersLength,
            labels: answers,
            label: 'chart1',
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
          },

          {
            data: lengthTime,
            labels: times,
            label: 'chart2',
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
          },

          {},
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (item, data) {
              var label = data.datasets[item.datasetIndex].labels[item.index];
              var value = data.datasets[item.datasetIndex].data[item.index];
              return label + ': ' + value;
            },
          },
        },
      }}
      datasetKeyProvider={datasetKeyProvider}
    />
  );
};

export default FinalChart;
