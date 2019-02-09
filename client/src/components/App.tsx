import * as React from 'react';
import { getIdentity } from '../api';
import RouteProvider from './RouteProvider';

type State = { username: string };

export default class App extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = { username: '' };
  }

  async componentDidMount() {
    const { username } = await getIdentity();
    this.setState({ username });
  }

  render() {
    return this.state.username ?
      <RouteProvider /> :
      <h1><a href="/api/auth">Log in</a></h1>;
  }
}