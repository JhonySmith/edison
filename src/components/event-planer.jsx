import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../firebase/firebase-config.js';

import Authorization from './authorization.jsx';
import StartEvent from './start-event.jsx';
import FirstPhase from './first-phase.jsx';
import SecondPhase from './second-phase.jsx';
import FirstPhaseEnd from './first-phase-end.jsx';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const dataBase = firebaseApp.database();

export default class EventPlanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      user: '',
      authError: '',
      eventStarted: false,
      currentUsers: 0,
      eventStartedTime: 0,
      fisrtPhaseTime: 0,
      firstPhaseEnd: false,
      secondPhaseTime: 0,
      users: '',
      secondPhase: false,
      eventWinner: '',
      timeWinner: '',
    };

    this.userRegHandler = this.userRegHandler.bind(this);
    this.userLoginHandler = this.userLoginHandler.bind(this);
    this.startEventHandler = this.startEventHandler.bind(this);
    this.firstPhaseEndHandler = this.firstPhaseEndHandler.bind(this);
    this.firstPhaseNewAnswerHandler = this.firstPhaseNewAnswerHandler.bind(this);
    this.openSecondFase = this.openSecondFase.bind(this);
  }

  init() {
    dataBase
      .ref('event')
      .once('value')
      .then((snapshot) => {
        this.setState({
          eventStarted: snapshot.val().config.start,
          fisrtPhaseTime: snapshot.val().config.fisrt_phase_time,
          secondPhaseTime: snapshot.val().config.second_phase_time,
          eventStartedTime: snapshot.val().config.start_time,
          firstPhaseEnd: snapshot.val().config.fisrt_phase_end,
          currentUsers: Object.keys(snapshot.val().users),
        });
      });
    dataBase.ref('event/users').on('value', (snapshot) => {
      this.setState({ currentUsers: Object.keys(snapshot.val()), users: snapshot.val() });
      console.log(snapshot.val());
    });
  }

  render() {
    if (!this.state.auth) {
      return (
        <Authorization
          userRegHandler={this.userRegHandler}
          userLoginHandler={this.userLoginHandler}
          authError={this.state.authError}
        />
      );
    }

    if (this.state.eventStarted) {
      if (this.state.firstPhaseEnd) {
        if (this.state.secondPhase) {
          return <SecondPhase eventWinner={this.state.eventWinner} timeWinner={this.state.timeWinner}/>
        }
        return <FirstPhaseEnd currentUsers={this.state.users} openSecondFase={this.openSecondFase}/>;
      }

      return (
        <FirstPhase
          firstPhaseUsers={this.state.currentUsers}
          user={this.state.user}
          timeLeftFirstPhase={Math.floor(
            (this.state.fisrtPhaseTime - (Date.now() - this.state.eventStartedTime)) / 60000,
          )}
          firstPhaseEndHandler={this.firstPhaseEndHandler}
          firstPhaseNewAnswerHandler={this.firstPhaseNewAnswerHandler}
        />
      );
    }

    if (!this.state.eventStarted) {
      return <StartEvent startEventHandler={this.startEventHandler} />;
    }
  }

  userRegHandler(user, password) {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(user, password)
      .then(() => {
        this.setState({ auth: true, user: user, authError: '' });
        this.init();
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({ authError: 'Пользователь уже зарегестрирован' });
        }
      });
  }

  userLoginHandler(user, password) {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(() => {
        this.setState({ auth: true, user: user });
        this.init();
      });
  }

  startEventHandler(fisrtPhaseTime, secondPhaseTime) {
    const nowDate = Date.now();

    dataBase
      .ref('event/config')
      .set({
        start: true,
        fisrt_phase_time: fisrtPhaseTime * 60000,
        fisrt_phase_end: false,
        second_phase_time: secondPhaseTime * 60000,
        start_time: nowDate,
      })
      .then(() => {
        this.init();
      });
  }

  firstPhaseNewAnswerHandler(time, answer) {
    dataBase.ref('event/users/' + this.state.user.split('@')[0]).set({
      answer: answer,
      time: time,
      user: this.state.user,
    });
  }

  firstPhaseEndHandler() {
    this.setState({ firstPhaseEnd: true });
  }

  openSecondFase(eventWinner, timeWinner) {
    this.setState({secondPhase: true,
    eventWinner: eventWinner,
    timeWinner: timeWinner
  });
  }

  backToFirstPhaseResults() {
    
  }
}
