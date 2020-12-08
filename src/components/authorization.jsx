import React from 'react';

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  render() {
    return (
      <form>
        <label htmlFor="login">
          Логин
          <input
            type="text"
            name="login"
            onChange={(evt) => this.setState({ login: evt.target.value })}
          ></input>
        </label>

        <label htmlFor="password">
          Пароль
          <input
            type="text"
            name="password"
            onChange={(evt) => this.setState({ password: evt.target.value })}
          ></input>
        </label>

        <button
          onClick={(evt) => {
            evt.preventDefault();
            this.userLoginHandler();
          }}
        >
          Вход
        </button>

        <button
          onClick={(evt) => {
            evt.preventDefault();
            this.userRegHandler();
          }}
        >
          Зарегестрироваться
        </button>

        <div></div>
      </form>
    );
  }

  // Вход с логином паролем
  userLoginHandler() {
    const { firebaseApp, authEndHandler } = this.props;

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.user, this.state.password)
      .then(() => {
        authEndHandler(this.state.user);
      });
  }

  // Вход через регистрацию
  userRegHandler() {
    const { firebaseApp, authEndHandler } = this.props;

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.user, this.state.password)
      .then(() => {
        authEndHandler(this.state.user);
      });
  }
}

export default Authorization;
