import PropTypes from 'prop-types';

const PasswordInput = (props) => {
  const { getPasswordHandler } = props;

  return (
    <label htmlFor="password" className="label label--auth">
      Пароль:
      <input
        className="input input--auth"
        type="password"
        name="password"
        placeholder="Password"
        onChange={(evt) => getPasswordHandler(evt.target.value)}
      ></input>
    </label>
  );
};

PasswordInput.propTypes = {
  getPasswordHandler: PropTypes.func.isRequired,
};

export default PasswordInput;
