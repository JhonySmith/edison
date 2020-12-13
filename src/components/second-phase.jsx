import React, { useState } from 'react';
import StopEvent from './stop-event.jsx';

const SecondPhase = (props) => {
  const { currentUser, currentUserId, dataBase, userId, backServer } = props;
  const [users, setUsers] = useState([]);
  const [alreadyAnswer, setAlreadyAnswer] = useState(true);
  const [admin, setAdmin] = useState(0);

  dataBase
    .ref('event/admin')
    .once('value')
    .then((snapshot) => {
      if (admin !== snapshot.val()) {
        setAdmin(snapshot.val());
      }
    });

  dataBase.ref('event/secondPhaseUsers').on('value', (snapshot) => {
    if (Object.values(snapshot.val()).length !== users.length) {
      setUsers(Object.values(snapshot.val()));
    }

    if (Object.keys(snapshot.val()).includes(currentUserId) !== alreadyAnswer) {
      setAlreadyAnswer(Object.keys(snapshot.val()).includes(currentUserId));
    }
  });

  const userAccept = () => {
    dataBase.ref('event/secondPhaseUsers/' + currentUserId).set({
      user: currentUser,
      answer: 'yes',
    });
  };

  const userReject = () => {
    dataBase.ref('event/secondPhaseUsers/' + currentUserId).set({
      user: currentUser,
      answer: 'no',
    });
  };

  return (
    <div>
      <ul>
        {users
          .filter((user) => user.answer === 'yes')
          .map((user) => (
            <li>{user.user}</li>
          ))}
      </ul>
      {alreadyAnswer ? 'Вы уже ответили' : 'Вы согласны с выбраным мероприятием?'}
      <button
        disabled={alreadyAnswer}
        onClick={(evt) => {
          evt.preventDefault();
          userAccept();
        }}
      >
        Согласиться
      </button>
      <button
        disabled={alreadyAnswer}
        onClick={(evt) => {
          evt.preventDefault();
          userReject();
        }}
      >
        Отказаться
      </button>
      {admin === userId ? <StopEvent backServer={backServer} /> : ''}
    </div>
  );
};

export default SecondPhase;
