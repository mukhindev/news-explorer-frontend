import { render } from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import './vendor/normalize.css';
import './vendor/fonts/fonts.css';
import './index.css';

render(
  <StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
