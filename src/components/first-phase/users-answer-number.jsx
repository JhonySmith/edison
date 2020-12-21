const UsersAnswersNumber = (props) => {
  const { asnwersNumber } = props;

  return (
    <div className="indicator-name">
      Пользователей проголосовало: <span className="indicator">{asnwersNumber}</span>
    </div>
  );
};

export default UsersAnswersNumber;
