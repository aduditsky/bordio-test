import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BasicLayout } from './layouts/basic.layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BasicLayout>
      <App />
    </BasicLayout>
  </React.StrictMode>
);
