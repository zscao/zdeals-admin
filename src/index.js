import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import store from './state/store';

import './index.scss';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
    <ToastContainer position="bottom-left" />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
