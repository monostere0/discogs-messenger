import {
  getIdentity,
  getMessages,
  getMessage,
} from '../api';
import fetch from '../fetch';

jest.mock('../fetch', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return Promise.resolve({
      json() {
        return Promise.resolve({ foo: 'bar' });
      }
    })  
  }),
}));

describe('src/api', () => {
  it('getIdentity()', async () => {
    const response = await getIdentity();
    expect(fetch).toHaveBeenCalledWith('../api/identity');
    expect(response).toMatchSnapshot();
  });
  it('getMessages()', async () => {
    const response = await getMessages();
    expect(fetch).toHaveBeenCalledWith('../api/messages');
    expect(response).toMatchSnapshot();
  });
  it('getMessage(orderId)', async () => {
    const response = await getMessage('44-112-2');
    expect(fetch).toHaveBeenCalledWith('../api/messages/44-112-2');
    expect(response).toMatchSnapshot();
  });
});
