const LoginInput = (props) => {
  const { getLoginHandler } = this.props;

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

export default LoginInput;
