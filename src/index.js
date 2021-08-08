import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const DATA = [];

ReactDOM.render(
  <React.StrictMode>
    <App dishes={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);
