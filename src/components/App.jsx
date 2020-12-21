import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dbEventsConfig, dbUsers } from '../firebase/firebase-init.js';
import { ActionCreator } from '../store/reducer.js';
import { ShowingPage } from '../utils/constants.js';

import Authorization from './authorization/authorization.jsx';
import StartEvent from './start-event/start-event.jsx';
import FirstPhase from './first-phase/first-phase.jsx';
import FirstPhaseEnd from './first-phase-end/first-phase-end.jsx';

class App extends React.Component {
  componentDidMount() {
    const { getPhaseHandler, getFirstPhaseUsers, getAdmin } = this.props;

    dbEventsConfig.onSnapshot((doc) => {
      const data = doc.data();
      getPhaseHandler(data.currentPhase);
      getAdmin(data.admin);
    });

    dbUsers.onSnapshot((doc) => {
      const data = doc.data();
      getFirstPhaseUsers(data.firstPhase);
    });
  }

  render() {
    const { user, phase, userId, admin } = this.props;

    if (!user) {
      return <Authorization />;
    }

    switch (phase) {
      case ShowingPage.FIRST_PHASE:
        return <FirstPhase admin={admin} userId={userId} />;

      case ShowingPage.FIRST_PHASE_END:
        return <FirstPhaseEnd />;

      default:
        return <StartEvent userId={userId} admin={admin} />;
    }
  }
}

App.propTypes = {
  admin: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired,
  getPhaseHandler: PropTypes.func.isRequired,
  getFirstPhaseUsers: PropTypes.func.isRequired,
  getAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  user: state.user,
  phase: state.phase,
  userId: state.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getPhaseHandler(phase) {
    dispatch(ActionCreator.currentPhase(phase));
  },
  getFirstPhaseUsers(users) {
    dispatch(ActionCreator.firstPhaseUsers(users));
  },
  getAdmin(admin) {
    dispatch(ActionCreator.currentAdmin(admin));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
