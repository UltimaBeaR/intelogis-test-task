import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';

import 'reset.scss'
import 'vendorImports';
import 'vendorOverrides.scss';
import 'main.scss';
import 'vendorConfig';

const rootElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHtmlElement);
root.render(rootElement);
