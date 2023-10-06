import React from 'react';
import ReactDOM from 'react-dom/client';
import { pwanow, splash } from 'pwanow';

import './index.scss';
import { App } from './App.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

pwanow({
  backgroundColor: '#25252d',
  iconUrl: '/logo.svg',
}).use(splash);
