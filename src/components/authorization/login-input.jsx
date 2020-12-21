import PropTypes from 'prop-types';

const LoginInput = (props) => {
  const { getLoginHandler } = props;

  return (
    <label htmlFor="login" className="label label--auth">
      Логин:
      <input
        className="input--auth"
        type="email"
        name="login"
        placeholder="E-mail"
        onChange={(evt) => getLoginHandler(evt.target.value)}
      ></input>
    </label>
  );
};

LoginInput.propTypes = {
  getLoginHandler: PropTypes.func.isRequired,
};

export default LoginInput;
