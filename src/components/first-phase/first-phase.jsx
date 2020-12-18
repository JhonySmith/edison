import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ActionCreator } from '../../store/reducer.js';

import TimerLeft from './timer-left.jsx';
import UsersAnswersNumber from './users-answer-number.jsx';
import TimeSelect from './time-select.jsx';
import EventChoose from './event-choose.jsx';
import SendButton from './send-button.jsx';
import StopEvent from '../stop-event.jsx';

import { dataBase } from '../../firebase/firebase-init';

class FirstPhase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choosenTime: '',
      event: '',
      usersAnswersCount: '',
    };
  }

  componentDidMount() {
    const { setUsersHandler } = this.props;
    dataBase.ref('event/firstPhaseUsers').on('value', (snapshot) => {
      let currentUsers = Object.values(snapshot.val());
      setUsersHandler(currentUsers);
    });
  }

  render() {
    const { admin, userId, firstPhaseTime, setUsersHandler, firstPhaseUsers } = this.props;

    return (
      <section>
        <div className="indicator-block">
          <TimerLeft />
          <UsersAnswersNumber answersNumber={firstPhaseUsers.length} />
        </div>
        <form className="form form--auth">
          <TimeSelect timeChooseHandler={this.timeChooseHandler} />
          <EventChoose getEvent={this.getEventHandler} />
          <SendButton />
          <div className="error-message">{false}</div>
        </form>
        {admin === userId ? <StopEvent /> : ''}
      </section>
    );
  }

  timeChooseHandler(choosenTime) {
    this.setState({ choosenTime });
  }

  getEventHandler(event) {
    this.setState({ event });
  }
}

const mapStateToProps = (state) => ({
  admin: state.admin,
  userId: state.userId,
  firstPhaseTime: state.firstPhaseTime,
  firstPhaseUsers: state.firstPhaseUsers,
});

const mapDispatchToProps = (dispatch) => ({
  setUsersHandler(users) {
    dispatch(ActionCreator.firstPhaseUsers(users));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstPhase);
