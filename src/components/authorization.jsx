import React from 'react';

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      id: '',
    };
  }

  render() {
    return (
      <form className="centered-form">
        <label htmlFor="login" className="label">
          Логин
          <input
            className="input"
            type="text"
            name="login"
            onChange={(evt) => this.setState({ login: evt.target.value })}
          ></input>
        </label>

        <label htmlFor="password" className="label">
          Пароль
          <input
            className="input"
            type="text"
            name="password"
            onChange={(evt) => this.setState({ password: evt.target.value })}
          ></input>
        </label>

        <button
          className="button"
          onClick={(evt) => {
            evt.preventDefault();
            this.userLoginHandler();
          }}
        >
          Вход
        </button>

        <button
          className="button"
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
}

export default Authorization;
