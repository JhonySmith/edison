import React from 'react';

import { ShowingPage } from '../utils/constants.js';

import Authorization from './authorization.jsx';
import StartEvent from './start-event.jsx';
import FirstPhase from './first-phase.jsx';
import SecondPhase from './second-phase.jsx';
import FirstPhaseEnd from './first-phase-end.jsx';

export default class EventPlanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingPage: '',
      currentUser: '',

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

    this.authEndHandler = this.authEndHandler.bind(this);

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
    const { showingPage } = this.state;
    const { firebaseApp, dataBase, backServer } = this.props;

    // Выбор отображения экрана
    switch (showingPage) {
      // Стартовая страница с настройками 1й фазы
      case ShowingPage.START_EVENT:
        return <StartEvent backServer={backServer} />;

      // Первая фаза
      case ShowingPage.FIRST_PHASE:
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

      // Окончание первой фазы с диаграммой
      case ShowingPage.FIRST_PHASE_END:
        return (
          <FirstPhaseEnd currentUsers={this.state.users} openSecondFase={this.openSecondFase} />
        );

      // Вторая фаза
      case ShowingPage.SECOND_PHASE:
        return (
          <SecondPhase eventWinner={this.state.eventWinner} timeWinner={this.state.timeWinner} />
        );

      // Окно авторизации
      default:
        return (
          <Authorization
            firebaseApp={firebaseApp}
            dataBase={dataBase}
            authEndHandler={this.authEndHandler}
          />
        );
    }
  }

  // Определяет текущее событие и подписывается на изменение фазы в БД
  setConfigStatus() {
    const { dataBase } = this.props;

    dataBase.ref('event/config/phase').on('value', (snapshot) => {
      if (snapshot.val() === 0) {
        dataBase
          .ref('event/config/')
          .set({
            phase: ShowingPage.START_EVENT,
          })
          .then(this.setState({ showingPage: snapshot.val() }));
      }

      this.setState({ showingPage: snapshot.val() });
    });
  }

  // Выполняется в случае успешной авторизации
  authEndHandler(currentUser) {
    this.setState({ currentUser: currentUser });
    this.setConfigStatus();
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
    this.setState({ secondPhase: true, eventWinner: eventWinner, timeWinner: timeWinner });
  }

  backToFirstPhaseResults() {}
}
