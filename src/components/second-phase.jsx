import React, { useState } from 'react';

const SecondPhase = (props) => {
  const { currentUser, currentUserId, dataBase } = props;
  const [users, setUsers] = useState('');
  const [alreadyAnswer, setAlreadyAnswer] = useState(true);

  dataBase.ref('event/config/secondPhaseUsers').on('value', (snapshot) => {
    setUsers(Object.values(snapshot.val()));

    //Проверяем нет ли данного пользователя в уже ответивших
    if (!Object.keys(snapshot.val()).includes(currentUserId)) {
      setAlreadyAnswer(false);
    }
  });

  const userAccept = () => {
    dataBase.ref('event/config/secondPhaseUsers/' + { currentUserId }).set({
      user: currentUser,
      answer: 'yes',
    });
  };

  const userReject = () => {
    dataBase.ref('event/config/secondPhaseUsers/' + { currentUserId }).set({
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
    </div>
  );
};

export default SecondPhase;
