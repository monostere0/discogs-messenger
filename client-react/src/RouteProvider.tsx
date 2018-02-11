import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import DiscogsMessenger from './components/DiscogsMessenger';

export default function RouteProvider() {
  return (
    <Router>
      <div>
        <Route exact={true} path="/" component={DiscogsMessenger} />
      </div>
    </Router>
  );
}