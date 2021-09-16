import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
// import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import createStore from './configureStore';
import withAppContext from './app/contexts/withAppContext'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from "./app/contexts/ThemeProvider";
import { RefreshContextProvider } from "./app/contexts/RefreshContext";
import { ModalProvider } from "@pancakeswap-libs/uikit";
import { ToastsProvider } from './app/contexts/ToastsContext/Provider';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './app/util'
import MainApp from './MainApp';

const { store } = createStore();

// TODO: refactor
const AppWithContext = withAppContext(
  MainApp
);

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <ToastsProvider>
        <ThemeContextProvider>
          <RefreshContextProvider>
            <ModalProvider>
              <Router>
                <AppWithContext />
              </Router>
            </ModalProvider>
          </RefreshContextProvider>
        </ThemeContextProvider>
      </ToastsProvider>
    </Provider>
  </Web3ReactProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
