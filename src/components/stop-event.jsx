import backServer from '../back-server/back-server-config.js';

const StopEvent = (props) => {
  const endEvent = () => {
    backServer.post('stopEvent', {
      states: 0,
      timeout: {
        first: 0,
        second: 0,
      },
    });
  };

  return (
    <button
      className="button button--stop"
      onClick={(evt) => {
        evt.preventDefault();
        endEvent();
      }}
    >
      Остановить и отменить голосование
    </button>
  );
};

export default StopEvent;
