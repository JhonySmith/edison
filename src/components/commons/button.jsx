const Button = (props) => {
  const { onClick, text } = props;

  return (
    <button
      className="button button--auth"
      onClick={(evt) => {
        evt.preventDefault();
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
