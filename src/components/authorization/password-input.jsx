const PasswordInput = (props) => {
  const { getPasswordHandler } = this.props;

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

export default PasswordInput;
