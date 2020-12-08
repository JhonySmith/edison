const END_TIME = 23;
const MINUTES_STEP = 15;

const getPickTimes = () => {
  const times = [];
  const nowTime = new Date();
  nowTime.setMinutes(0);

  while (nowTime.getHours() < END_TIME) {
    times.push(`${nowTime.getHours()}:${nowTime.getMinutes() === 0 ? '00' : nowTime.getMinutes()}`);
    nowTime.setMinutes(nowTime.getMinutes() + MINUTES_STEP);
  }

  times.push('23:00');

  return times;
};

export default getPickTimes;
