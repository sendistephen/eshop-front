import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from 'App';
import './index.css';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={6000} placement='top-right'>
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
