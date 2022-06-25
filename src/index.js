import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Routing from './routes/index.router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Routing/>
  </>
);
reportWebVitals();
