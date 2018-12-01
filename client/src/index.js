import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import './index.css';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './Login.css';


ReactDOM.render(
    <Router>
      <App />
    </Router>, 
  document.getElementById('root'));
