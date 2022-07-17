import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'store';
import { pushInitialDataToStore } from 'initialData/pushToStore';
import App from 'components/App';

import 'initialImports';

pushInitialDataToStore();

const rootElement = (
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);

const rootHtmlElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootHtmlElement);
root.render(rootElement);
