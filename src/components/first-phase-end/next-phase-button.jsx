import { connect } from 'react-redux';
import ShowingPage from '../../utils/constants.js';

import { ActionCreator } from '../../store/reducer.js';

const NextPhaseButton = (props) => {
  const { openSecondPhaseHandler } = props;

  return (
    <button
      className="button button--auth"
      onClick={(evt) => {
        evt.preventDefault();
        openSecondPhaseHandler(ShowingPage.SECOND_PHASE);
      }}
    >
      Перейти ко 2й фазе
    </button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openSecondPhaseHandler(phase) {
    dispatch(ActionCreator.currentPhase(phase));
  },
});

export default connect(null, mapDispatchToProps)(NextPhaseButton);
