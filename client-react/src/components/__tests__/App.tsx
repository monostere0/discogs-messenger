import * as React from 'react';
import { create } from 'react-test-renderer';

import App from '../App';

jest.mock('../RouteProvider', () => ({
  default: 'ChildComponent'
}));

describe('components/App', () => {
  it('should render', () => {
    const tree = create(<App />);
    expect(tree).toMatchSnapshot();
  });
});