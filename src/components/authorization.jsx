import React, { useState } from 'react';

const Authorization = (props) => {
  const { userRegHandler, userLoginHandler, authError } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <label htmlFor="login">
        Логин
        <input type="text" name="login" onChange={(evt) => setLogin(evt.target.value)}></input>
      </label>
      <label htmlFor="password">
        Пароль
        <input
          type="text"
          name="password"
          onChange={(evt) => setPassword(evt.target.value)}
        ></input>
      </label>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          userLoginHandler(login, password);
        }}
      >
        Вход
      </button>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          userRegHandler(login, password);
        }}
      >
        Зарегестрироваться
      </button>
      <div>{authError}</div>
    </form>
  );
};

export default Authorization;
