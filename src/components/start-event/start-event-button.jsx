import PropTypes from 'prop-types';

const StartEventButton = (props) => {
  const { startEventHandler, buttonDisabled } = props;

  return (
    <button
      className="button button--auth"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        startEventHandler();
      }}
      disabled={buttonDisabled}
    >
      {buttonDisabled ? 'Загрузка...' : 'Старт'}
    </button>
  );
};

StartEventButton.propTypes = {
  startEventHandler: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool,
};

export default StartEventButton;
