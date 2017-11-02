// Styles for view
const css = require('./app.scss');

// React components
import React from 'react';
import ReactDOM from 'react-dom';

// Dev components
import userService from './js/userService';

let getUserData = userService({
  method: 'GET',
  action: '/users'
});

getUserData.then((data) => {
  let dataJson = JSON.parse(data);

  console.log(dataJson);
});
