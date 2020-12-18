const ActionType = {
  CURRENT_ADMIN: `CURRENT_ADMIN`,
  CURRENT_USER: `CURRENT_USER`,
  CURRENT_USER_ID: `CURRENT_USER_ID`,
  CURRENT_PHASE: `CURRENT_PHASE`,
  FIRST_PHASE_TIME: `FIRST_PHASE_TIME`,
  SECOND_PHASE_TIME: `SECOND_PHASE_TIME`,
  FIRST_PHASE_USERS: `FISRT_PHASE_USERS`,
};

const initialState = {
  user: '',
  userId: '',
  phase: '',
  admin: '',
  firstPhaseTime: 0,
  firstPhaseUsers: [],
};

const ActionCreator = {
  currentUser: (user) => {
    return {
      type: ActionType.CURRENT_USER,
      payload: user,
    };
  },
  currentUserId: (id) => {
    return {
      type: ActionType.CURRENT_USER_ID,
      payload: id,
    };
  },
  currentPhase: (phase) => {
    return {
      type: ActionType.CURRENT_PHASE,
      payload: phase,
    };
  },
  currentAdmin: (admin) => {
    return {
      type: ActionType.CURRENT_ADMIN,
      payload: admin,
    };
  },
  firstPhaseTime: (time) => {
    return {
      type: ActionType.FIRST_PHASE_TIME,
      payload: time,
    };
  },
  firstPhaseUsers: (users) => {
    return {
      type: ActionType.FIRST_PHASE_USERS,
      payload: users,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CURRENT_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case ActionType.CURRENT_USER_ID:
      return Object.assign({}, state, {
        userId: action.payload,
      });
    case ActionType.CURRENT_PHASE:
      return Object.assign({}, state, {
        phase: action.payload,
      });
    case ActionType.CURRENT_ADMIN:
      return Object.assign({}, state, {
        admin: action.payload,
      });
    case ActionType.FIRST_PHASE_TIME:
      return Object.assign({}, state, {
        firstPhaseTime: action.payload,
      });
    case ActionType.FIRST_PHASE_USERS:
      return Object.assign({}, state, {
        firstPhaseUsers: action.payload,
      });
    default:
      return state;
  }
};

export { ActionType, ActionCreator, reducer };
