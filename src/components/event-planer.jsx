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
      currentUserID: '',
    };

    this.authEndHandler = this.authEndHandler.bind(this);
    this.setConfigStatus = this.setConfigStatus.bind(this);
    this.openSecondFase = this.openSecondFase.bind(this);
  }

  render() {
    const { showingPage } = this.state;
    const { firebaseApp, dataBase, backServer } = this.props;

    // Выбор отображения экрана
    switch (showingPage) {
      // Стартовая страница с настройками 1й фазы
      case ShowingPage.START_EVENT:
        return (
          <StartEvent
            backServer={backServer}
            dataBase={dataBase}
            currentUserID={this.state.currentUserID}
          />
        );

      // Первая фаза
      case ShowingPage.FIRST_PHASE:
        return (
          <FirstPhase
            backServer={backServer}
            userId={this.state.currentUserID}
            dataBase={this.props.dataBase}
          />
        );

      // Окончание первой фазы с диаграммой
      case ShowingPage.FIRST_PHASE_END:
        return (
          <FirstPhaseEnd
            setConfigStatus={this.setConfigStatus}
            dataBase={this.props.dataBase}
            openSecondFase={this.openSecondFase}
            backServer={backServer}
            userId={this.state.currentUserID}
          />
        );

      // Вторая фаза
      case ShowingPage.SECOND_PHASE:
        return (
          <SecondPhase
            currentUser={this.state.currentUser}
            currentUserId={this.state.currentUserID}
            setConfigStatus={this.setConfigStatus}
            dataBase={this.props.dataBase}
            backServer={backServer}
            userId={this.state.currentUserID}
          />
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
      if (this.state.showingPage !== snapshot.val()) {
        this.setState({ showingPage: snapshot.val() });
      }
    });
  }

  // Выполняется в случае успешной авторизации
  authEndHandler(currentUser, id) {
    this.setState({ currentUser: currentUser, currentUserID: id });
    this.setConfigStatus();
  }

  openSecondFase() {
    this.setState({ showingPage: ShowingPage.SECOND_PHASE });
  }
}
