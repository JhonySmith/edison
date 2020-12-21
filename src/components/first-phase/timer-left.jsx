import PropTypes from 'prop-types';

const TimerLeft = (props) => {
  const { firstPhaseTimeLeft } = props;

  return (
    <div className="indicator-name">
      Оставшееся время: <span className="indicator">{firstPhaseTimeLeft} мин.</span>
    </div>
  );
};

TimerLeft.propTypes = {
  firstPhaseTimeLeft: PropTypes.number.isRequired,
};

export default TimerLeft;
