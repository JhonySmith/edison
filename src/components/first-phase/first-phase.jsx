import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dbEventsConfig, dbUsers, firebaseApp } from '../../firebase/firebase-init';
import { ActionCreator } from '../../store/reducer';

import TimerLeft from './timer-left.jsx';
import UsersAnswersNumber from './users-answer-number.jsx';
import TimeSelect from './time-select.jsx';
import EventChoose from './event-choose.jsx';
import SendButton from './send-button.jsx';
import StopEvent from '../stop-event.jsx';

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

  componentDidMount() {
    const { getFirstPhaseTimeLeft } = this.props;

    dbEventsConfig.onSnapshot((doc) => {
      const data = doc.data();
      getFirstPhaseTimeLeft(data.firstPhaseTimeLeft);
    });
  }

  render() {
    const { admin, userId, firstPhaseTimeLeft, firstPhaseUsers } = this.props;

    firstPhaseUsers.map((users) => users.id === userId && this.setState({ alreadyAnswer: true }));

    return (
      <section>
        <div className="indicator-block">
          <TimerLeft firstPhaseTime={firstPhaseTimeLeft} />
          <UsersAnswersNumber answersNumber={firstPhaseUsers.length} />
        </div>
        <form className="form form--auth">
          <TimeSelect timeChooseHandler={this.timeChooseHandler} />
          <EventChoose getEvent={this.getEventHandler} />
          <SendButton sendDataHandler={this.sendDataHandler} disabled={this.state.alreadyAnswer} />
          <div className="error-message">{false}</div>
        </form>
        {admin === userId && <StopEvent />}
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

    dbUsers.update({
      firstPhase: firebaseApp.firestore.FieldValue.arrayUnion({
        userId,
        time: this.state.choosenTime,
        event: this.state.event,
      }),
    });
  }
}

FirstPhase.propTypes = {
  userId: PropTypes.string.isRequired,
  admin: PropTypes.string.isRequired,
  firstPhaseTimeLeft: PropTypes.number.isRequired,
  firstPhaseUsers: PropTypes.array.isRequired,
  getFirstPhaseTimeLeft: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  firstPhaseTimeLeft: state.firstPhaseTimeLeft,
  firstPhaseUsers: state.firstPhaseUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getFirstPhaseTimeLeft(time) {
    dispatch(ActionCreator.firstPhaseTimeLeft(time));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstPhase);
