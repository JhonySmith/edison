const NextPhaseButton = (props) => {
  const { openSecondFaseHandler } = props;

  return (
    <button
      className="button button--auth"
      onClick={(evt) => {
        evt.preventDefault();
        openSecondFaseHandler();
      }}
    >
      Перейти ко 2й фазе
    </button>
  );
};

export default NextPhaseButton;
