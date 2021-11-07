import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from 'App';
import './index.css';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='h-full w-full'>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement='top-right'
      >
        <App />
      </ToastProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
