import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dataBase } from '../firebase/firebase-init.js';
import { ActionCreator } from '../store/reducer.js';
import { ShowingPage } from '../utils/constants.js';

import Authorization from './authorization/authorization.jsx';
import StartEvent from './start-event/start-event.jsx';
import FirstPhase from './first-phase/first-phase.jsx';
import FirstPhaseEnd from './first-phase-end/first-phase-end.jsx';

class App extends React.Component {
  componentDidMount() {
    const { getPhaseHandler } = this.props;
    dataBase.ref('event/config/phase').on('value', (snapshot) => {
      getPhaseHandler(snapshot.val());
    });
  }

  render() {
    const { user, phase, userId } = this.props;

    if (!user) {
      return <Authorization />;
    }

    switch (phase) {
      case ShowingPage.FIRST_PHASE:
        return <FirstPhase />;

      case ShowingPage.FIRST_PHASE_END:
        return <FirstPhaseEnd />;

      default:
        return <StartEvent userId={userId} />;
    }
  }
}

App.propTypes = {
  user: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired,
  getPhaseHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  phase: state.phase,
  userId: state.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getPhaseHandler(phase) {
    dispatch(ActionCreator.currentPhase(phase));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
