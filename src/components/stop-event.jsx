import React from 'react';

class StopEvent extends React.Component {
  constructor(props) {
    super(props);

    this.endEvent = this.endEvent.bind(this);
  }

  endEvent() {
    const { backServer } = this.props;

    backServer.post('stopEvent', {
      states: 0,
      timeout: {
        first: 0,
        second: 0,
      },
    });
  }

  render() {
    return (
      <button
        className="button button--stop"
        onClick={(evt) => {
          evt.preventDefault();
          this.endEvent();
        }}
      >
        Отменить голосование
      </button>
    );
  }
}

export default StopEvent;
