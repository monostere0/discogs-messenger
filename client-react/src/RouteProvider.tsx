import * as React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import DiscogsMessenger from './components/DiscogsMessenger';

export default class RouteProvider extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <DiscogsMessenger />
        </div>
      </Router>
    );
  }
}