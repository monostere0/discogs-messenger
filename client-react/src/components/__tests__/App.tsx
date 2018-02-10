import * as React from 'react';
import * as renderer from 'react-test-renderer';

import App from '../App';

describe('src/App', () => {
  it('should render', () => {
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });
});