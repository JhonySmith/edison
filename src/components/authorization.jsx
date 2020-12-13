import React from 'react';

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      id: '',
      notValid: 0,
    };
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
      })
      .catch((error) => {
        let errorCode = error.code;

        switch (errorCode) {
          case 'auth/user-not-found':
            this.setState({ notValid: 'Такого пользователя не существует' });
            break;

          case 'auth/invalid-email':
            this.setState({ notValid: 'Вы ввели некорректный адрес почты' });
            break;

          case 'auth/wrong-password':
            this.setState({ notValid: 'Проверьте правильность пароля' });
            break;

          default:
            this.setState({ notValid: error.message });
        }
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
      })
      .catch((error) => {
        let errorCode = error.code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.setState({ notValid: 'Такой пользователь уже существует' });
            break;

          case 'auth/wrong-password':
            this.setState({ notValid: 'Проверьте правильность пароля' });
            break;

          case 'auth/weak-password':
            this.setState({ notValid: 'Пароль ненадежен' });
            break;

          default:
            this.setState({ notValid: error.message });
        }
      });
  }

  render() {
    return (
      <form className="form form--auth">
        <b className="bold-text bold-text--auth">
          Введите ваш email в качестве логина и пароль. Если не зарегестрированы, введите данные и
          нажмите - "Регистрация" !
        </b>
        <label htmlFor="login" className="label label--auth">
          Логин:
          <input
            className="input input--auth"
            type="email"
            name="login"
            placeholder="E-mail"
            onChange={(evt) => {
              this.setState({ login: evt.target.value });
            }}
          ></input>
        </label>

        <label htmlFor="password" className="label label--auth">
          Пароль:
          <input
            className="input input--auth"
            type="password"
            name="password"
            placeholder="Password"
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

        <div className="error-message">{this.state.notValid ? this.state.notValid : ''}</div>
      </form>
    );
  }
}

export default Authorization;
