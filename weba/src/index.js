import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
