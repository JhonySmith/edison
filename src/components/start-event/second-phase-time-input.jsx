import PropTypes from 'prop-types';

const SecondPhaseTimeInput = (props) => {
  const { getSecondPhaseTimeHandler } = props;

  return (
    <label className="label label--auth" htmlFor="second-phase">
      Время 2 фазы (в минутах)
      <input
        className="input input--start-event"
        type="number"
        name="second-phase"
        onChange={(evt) => getSecondPhaseTimeHandler(evt.target.value)}
      ></input>
    </label>
  );
};

SecondPhaseTimeInput.propTypes = {
  getSecondPhaseTimeHandler: PropTypes.func.isRequired,
};

export default SecondPhaseTimeInput;
