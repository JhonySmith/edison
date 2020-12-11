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
            console.log(1);
            this.setState({ notValid: 'Такого пользователя не существует' });
            break;

          case 'auth/invalid-email':
            console.log(2);
            this.setState({ notValid: 'Вы ввели некорректный адрес почты' });
            break;

          case 'auth/wrong-password':
            console.log(3);
            this.setState({ notValid: 'Проверьте правильность пароля' });
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
            this.validateDatas() && this.userRegHandler();
          }}
        >
          Зарегестрироваться
        </button>

        <div>{this.state.notValid ? this.state.notValid : ''}</div>
      </form>
    );
  }

  // Вход с логином паролем

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
      .catch(function (error) {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.setState({ notValid: 'Данный логин уже используется' });

          case 'auth/invalid-email':
            this.setState({ notValid: 'Вы ввели некорректный адрес почты' });
        }
      });
  }

  validateDatas() {
    const isValid = this.state.login.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    isValid
      ? this.setState({ notValid: false })
      : this.setState({ notValid: 'Вы ввели некорректные данные' });

    return isValid;
  }
}

export default Authorization;
