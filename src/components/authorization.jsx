import React from 'react';

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      id: '',
      notValid: false,
    };
  }

  render() {
    return (
      <form className="form form--auth">
        <b className="bold-text bold-text--auth">
          Введите ваш email в качестве логина и пароль. Если не зарегестрированы, введите данные и
          нажмите - "Регистрация" !
        </b>
        <label htmlFor="login" className="label label--auth">
          Логин
          <input
            className="input input--auth"
            type="email"
            name="login"
            onChange={(evt) => {
              this.setState({ login: evt.target.value });
              this.validateDatas();
            }}
          ></input>
        </label>

        <label htmlFor="password" className="label label--auth">
          Пароль
          <input
            className="input input--auth"
            type="password"
            name="password"
            onChange={(evt) => this.setState({ password: evt.target.value })}
          ></input>
        </label>

        <button
          className="button button--auth"
          onClick={(evt) => {
            evt.preventDefault();
            this.userLoginHandler();
          }}
        >
          Вход
        </button>

        <button
          className="button button--auth"
          onClick={(evt) => {
            evt.preventDefault();
            this.userRegHandler();
          }}
        >
          Зарегестрироваться
        </button>

        <div>{this.state.notValid ? this.state.notValid : ''}</div>
      </form>
    );
  }

  // Вход с логином паролем
  userLoginHandler() {
    const { firebaseApp, authEndHandler } = this.props;

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.login, this.state.password)
      .then(() => {
        this.setState({ id: firebaseApp.auth().currentUser.uid });
        authEndHandler(this.state.login, this.state.id);
      });
  }

  // Вход через регистрацию
  userRegHandler() {
    const { firebaseApp, authEndHandler } = this.props;

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.login, this.state.password)
      .then(() => {
        this.setState({ id: firebaseApp.auth().currentUser.uid });
        authEndHandler(this.state.login, this.state.id);
      });
  }

  validateDatas() {
    const isValid = this.state.login.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (isValid) {
      this.setState({ notValid: false });
    } else {
      this.setState({ notValid: 'Вы ввели некорректные данные' });
    }
  }
}

export default Authorization;
