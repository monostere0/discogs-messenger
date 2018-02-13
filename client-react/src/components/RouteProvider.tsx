import * as React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import MessengerContainer from './MessengerContainer';

export default function RouteProvider() {
  return (
    <Router>
      <MessengerContainer />
    </Router>
  );
}