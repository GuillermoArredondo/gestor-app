import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import reportWebVitals from './reportWebVitals';
import { GestorApp } from './GestorApp';
import { AppRouter } from './routers/AppRouter';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <AppRouter></AppRouter>
  </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();
