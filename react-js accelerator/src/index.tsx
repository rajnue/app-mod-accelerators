import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import { ThemeProvider } from './assets/styles/theme/theme-provider';

// Placed Context in the root context to act as a global context for all routes

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
