import PropTypes from 'prop-types';

const FirstPhaseTimeInput = (props) => {
  const { getFirstTimeHandler } = props;

  return (
    <label className="label label--auth" htmlFor="first-phase">
      Время 1 фазы (в минутах)
      <input
        className="input input--start-event"
        type="number"
        name="first-phase"
        onChange={(evt) => getFirstTimeHandler(evt.target.value)}
      ></input>
    </label>
  );
};

FirstPhaseTimeInput.propTypes = {
  getFirstTimeHandler: PropTypes.func.isRequired,
};

export default FirstPhaseTimeInput;
