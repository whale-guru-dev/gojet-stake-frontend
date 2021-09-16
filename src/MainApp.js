import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';

import App from './app';

import 'react-notifications-component/dist/theme.css';
import './App.css';

function MainApp() {
  useEffect(() => {
    const script1 = document.createElement('script');
    const script2 = document.createElement('script');

    script1.src = 'assets/js/custom.unified.js';
    script2.src = 'assets/js/common.js';

    script1.async = true;
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }, []);

  return (
    <Router>
      <ReactNotification />
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default MainApp;
