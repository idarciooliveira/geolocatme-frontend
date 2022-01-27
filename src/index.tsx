import ReactDOM from 'react-dom';
import './index.css';

import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';

import { ToastContainer } from 'react-toastify';

import App from './App';

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer/>
        <App />
      </AuthProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
