import getPickTimes from '../../utils/time.js';

const TimeSelect = (props) => {
  const { timeChooseHandler } = props;

  return (
    <label className="label label--auth" htmlFor="event-time">
      Выберете время:
      <select
        className="input input--auth"
        name="event-time"
        onChange={(evt) => timeChooseHandler(evt.target.value)}
      >
        {getPickTimes().map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TimeSelect;
