import React, { useState } from 'react';
import { ShowingPage } from '../../utils/constants.js';
import PropTypes from 'prop-types';

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

    this.getFirstTimeHandler = this.getFirstTimeHandler.bind(this);
    this.getSecondTimeHandler = this.getSecondTimeHandler.bind(this);
    this.startEvent = this.startEvent.bind(this);
  }

  render() {
    return (
      <form className="form form--auth">
        <FirstPhaseTimeInput getFirstTimeHandler={this.getFirstTimeHandler} />
        <SecondPhaseTimeInput getSecondTimeHandler={this.getSecondTimeHandler} />
        <StartEventButton
          buttonDisabled={this.state.buttonDisabled}
          startEventHandler={this.startEvent}
        />
        <div className="error-message">{this.state.notValid}</div>
      </form>
    );
  }

  getFirstTimeHandler(time) {
    this.setState({ firstPhaseTime: time });
  }

  getSecondTimeHandler(time) {
    this.setState({ secondPhaseTime: time });
  }

  startEvent() {
    const { dataBase, backServer, currentUserID } = this.props;

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
            admin: currentUserID,
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

export default StartEvent;
