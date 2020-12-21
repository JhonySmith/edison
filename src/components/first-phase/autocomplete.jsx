import React from 'react';
import Autosuggest from 'react-autosuggest';
import { dataBase } from '../../firebase/firebase-init';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, data) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return data.filter((dt) => regex.test(dt.text));
}

function getSuggestionValue(suggestion) {
  return suggestion.text;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.text}</span>;
}

class Autocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      events: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

  onChange(event, { newValue, method }) {
    const { getEvent } = this.props;
    this.setState({
      value: newValue,
    });
    getEvent(newValue);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value, this.state.events),
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    dataBase.ref('events').on('value', (snapshot) => {
      if (Object.values(snapshot.val()).length !== this.state.events.length) {
        this.setState({ events: Object.values(snapshot.val()) });
      }
    });

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Введите мероприятие',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Autocomplete;
