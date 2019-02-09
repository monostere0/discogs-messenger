import * as React from 'react';
import { create } from 'react-test-renderer';

import RouteProvider from '../RouteProvider';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  BrowserRouter: 'BrowserRouter',
}));
jest.mock('../MessengerContainer', () => ({
  default: 'MessengerContainer'
}));

describe('components/RouteProvider', () => {
  it('should render', () => {
    const tree = create(<RouteProvider />);
    expect(tree).toMatchSnapshot();
  });
});