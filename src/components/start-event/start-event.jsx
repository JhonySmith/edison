import React from 'react';
import PropTypes from 'prop-types';

import { ShowingPage } from '../../utils/constants.js';
import { dataBase } from '../../firebase/firebase-init.js';
import { backServer } from '../../back-server/back-server-config.js';

import FirstPhaseTimeInput from './first-phase-time-input.jsx';
import SecondPhaseTimeInput from './second-phase-time-input.jsx';
import StartEventButton from './start-event-button.jsx';

class StartEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstPhaseTime: '',
      secondPhaseTime: '',
      notValid: false,
      buttonDisabled: false,
    };

    this.getFirstPhaseTimeHandler = this.getFirstPhaseTimeHandler.bind(this);
    this.getSecondPhaseTimeHandler = this.getSecondPhaseTimeHandler.bind(this);
    this.startEvent = this.startEvent.bind(this);
  }

  render() {
    return (
      <form className="form form--auth">
        <FirstPhaseTimeInput getFirstPhaseTimeHandler={this.getFirstPhaseTimeHandler} />
        <SecondPhaseTimeInput getSecondPhaseTimeHandler={this.getSecondPhaseTimeHandler} />
        <StartEventButton
          buttonDisabled={this.state.buttonDisabled}
          startEventHandler={this.startEvent}
        />
        <div className="error-message">{this.state.notValid}</div>
      </form>
    );
  }

  getFirstPhaseTimeHandler(time) {
    this.setState({ firstPhaseTime: time });
  }

  getSecondPhaseTimeHandler(time) {
    this.setState({ secondPhaseTime: time });
  }

  startEvent() {
    const { userId } = this.props;

    dataBase
      .ref('event/config/phase')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() !== 'startEvent') {
          this.setState({ notValid: 'Кто то уже запустил голосование' });
        } else if (!this.state.firstPhaseTime || !this.state.secondPhaseTime) {
          this.setState({ notValid: 'Вы ввели не все данные' });
        } else {
          backServer.post('startEvent', {
            admin: userId,
            states: ShowingPage,
            timeout: {
              first: this.state.firstPhaseTime * 60000,
              second: this.state.secondPhaseTime * 60000,
            },
          });
        }
      });
  }
}

StartEvent.propTypes = {};

export default StartEvent;
