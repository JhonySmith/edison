import React from 'react';
import { connect } from 'react-redux';

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
      alreadyAnswer: false,
    };

    this.timeChooseHandler = this.timeChooseHandler.bind(this);
    this.getEventHandler = this.getEventHandler.bind(this);
    this.sendDataHandler = this.sendDataHandler.bind(this);
  }

  render() {
    const { admin, userId, firstPhaseTimeLeft, firstPhaseUsers } = this.props;

    const alreadyAnswerUsersId = Object.keys(firstPhaseUsers);
    this.setState({ alreadyAnswer: alreadyAnswerUsersId.includes(userId) });

    return (
      <section>
        <div className="indicator-block">
          <TimerLeft firstPhaseTime={firstPhaseTimeLeft} />
          <UsersAnswersNumber answersNumber={alreadyAnswerUsersId.length} />
        </div>
        <form className="form form--auth">
          <TimeSelect timeChooseHandler={this.timeChooseHandler} />
          <EventChoose getEvent={this.getEventHandler} />
          <SendButton sendDataHandler={this.sendDataHandler} disabled={this.state.alreadyAnswer} />
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

  sendDataHandler() {
    const { userId } = this.props;

    dataBase.ref('event/firstPhaseUsers' + userId).set({
      time: this.state.choosenTime,
      event: this.state.event,
    });
  }
}

const mapStateToProps = (state) => ({
  admin: state.admin,
  userId: state.userId,
  firstPhaseTimeLeft: state.firstPhaseTimeLeft,
  firstPhaseUsers: state.firstPhaseUsers,
});

export default connect(mapStateToProps, null)(FirstPhase);
