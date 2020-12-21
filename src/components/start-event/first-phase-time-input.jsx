import PropTypes from 'prop-types';

const FirstPhaseTimeInput = (props) => {
  const { getFirstPhaseTimeHandler } = props;

  return (
    <label className="label label--auth" htmlFor="first-phase">
      Время 1 фазы (в минутах)
      <input
        className="input input--start-event"
        type="number"
        name="first-phase"
        min="1"
        onChange={(evt) => getFirstPhaseTimeHandler(evt.target.value)}
      ></input>
    </label>
  );
};

FirstPhaseTimeInput.propTypes = {
  getFirstPhaseTimeHandler: PropTypes.func.isRequired,
};

export default FirstPhaseTimeInput;
