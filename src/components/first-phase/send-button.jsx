const SendButton = (props) => {
  const { disabled, sendDataHandler } = props;

  return (
    <button
      className="button button--auth"
      disabled={disabled}
      type="submit"
      onClick={(evt) => {
        evt.preventDefault();
        sendDataHandler();
      }}
    >
      {disabled ? 'Отправлено' : 'Отправить'}
    </button>
  );
};

export default SendButton;
