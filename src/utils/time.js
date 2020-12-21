const END_TIME = 23;
const MINUTES_STEP = 15;

const getPickTimes = () => {
  const times = [];
  const nowTime = new Date();
  const setTime = new Date().setMinutes(0);

  while (setTime.getHours() < END_TIME) {
    if (nowTime < setTime) {
      times.push(
        `${setTime.getHours()}:${setTime.getMinutes() === 0 ? '00' : setTime.getMinutes()}`,
      );
      setTime.setMinutes(setTime.getMinutes() + MINUTES_STEP);
    }
  }

  times.push('23:00');

  return times;
};

export default getPickTimes;
