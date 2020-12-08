import React, { Component } from 'react';

import axios from 'axios';

const axiosTest = axios.create({
  baseURL: 'http://localhost:3002/',
  responseType: 'json',
});

export default class TestComponent extends Component {
  render() {
    return (
      <button
        onClick={(evt) => {
          evt.preventDefault();
          axiosTest
            .post('123', {
              caption: 22222,
              smth: 2,
            })
            .then((response) => {
              console.log(123);
            });
        }}
      >
        123
      </button>
    );
  }
}
