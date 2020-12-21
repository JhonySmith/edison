import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { errorMessage } = props;

  return <div className="error-message">{errorMessage ? errorMessage : ''}</div>;
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
