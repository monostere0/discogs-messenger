import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import List from './components/List';

export default function RouteProvider() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Foo</Link></li>
        </ul>

        <hr />

        <Route exact={true} path="/" component={List}/>
      </div>
    </Router>
  );
}