import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/reducer.js';

import { authorization } from '../../firebase/firebase-init';

import LoginInput from './login-input.jsx';
import PasswordInput from './password-input.jsx';
import Button from '../commons/button.jsx';
import ErrorMessage from './error-message.jsx';

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      id: '',
      password: '',
      notValid: '',
    };

    this.getLoginHandler = this.getLoginHandler.bind(this);
    this.getPasswordHandler = this.getPasswordHandler.bind(this);
    this.userLoginHandler = this.userLoginHandler.bind(this);
    this.userRegHandler = this.userRegHandler.bind(this);
  }

  render() {
    return (
      <form className="form form--auth">
        <b className="bold-text bold-text--auth">
          Введите ваш email в качестве логина и пароль. Если не зарегестрированы, введите данные и
          нажмите - "Регистрация" !
        </b>

        <LoginInput getLoginHandler={this.getLoginHandler} />
        <PasswordInput getPasswordHandler={this.getPasswordHandler} />
        <Button text={'Войти'} onClick={this.userLoginHandler} />
        <Button text={'Зарегестрироваться'} onClick={this.userRegHandler} />
        <ErrorMessage errorMessage={this.state.notValid} />
      </form>
    );
  }

  // Получение введенного логина
  getLoginHandler(login) {
    this.setState({ login: login });
  }

  //Получение введенного пароля
  getPasswordHandler(password) {
    this.setState({ password: password });
  }

  // Вход с логином паролем
  userLoginHandler() {
    const { authEndHandler } = this.props;

    authorization
      .signInWithEmailAndPassword(this.state.login, this.state.password)
      .then(() => {
        authEndHandler(this.state.login, authorization.currentUser.uid);
      })
      .catch((error) => {
        this.setErrorMessageHandler(error.code);
      });
  }

  // Вход через регистрацию
  userRegHandler() {
    const { authEndHandler } = this.props;

    authorization
      .createUserWithEmailAndPassword(this.state.login, this.state.password)
      .then(() => {
        authEndHandler(this.state.login, authorization.currentUser.uid);
      })
      .catch((error) => {
        this.setErrorMessageHandler(error.code);
      });
  }

  // Вывод ошибки по коду
  setErrorMessageHandler(errorCode) {
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

      case 'auth/email-already-in-use':
        this.setState({ notValid: 'Такой пользователь уже существует' });
        break;

      case 'auth/weak-password':
        this.setState({ notValid: 'Пароль ненадежен' });
        break;

      default:
        this.setState({ notValid: errorCode });
    }
  }
}

Authorization.propTypes = {
  authEndHandler: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  authEndHandler(user, id) {
    dispatch(ActionCreator.currentUser(user));
    dispatch(ActionCreator.currentUserId(id));
  },
});

export { Authorization };
export default connect(null, mapDispatchToProps)(Authorization);
