import Autocomplete from '../autocomplete.jsx';

const EventChoose = (props) => {
  const { getEvent } = props;
  return (
    <label className="label label--auth" htmlFor="event">
      Введите мероприятие:
      <Autocomplete getEvent={getEvent} />
    </label>
  );
};

export default EventChoose;
