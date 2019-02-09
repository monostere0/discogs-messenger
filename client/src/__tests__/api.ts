import {
  getIdentity,
  getMessages,
  getConversation,
} from '../api';
import fetch from '../fetch';

jest.mock('../fetch', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return Promise.resolve({
      json() {
        return Promise.resolve({ foo: 'bar' });
      }
    });
  }),
}));

describe('src/api', () => {
  it('getIdentity()', async () => {
    const response = await getIdentity();
    expect(fetch).toHaveBeenCalledWith('../api/identity');
    expect(response).toMatchSnapshot();
  });
  xit('getMessages()', async () => {
    const response = await getMessages();
    expect(fetch).toHaveBeenCalledWith('../api/messages');
    expect(response).toMatchSnapshot();
  });
  xit('getConversation(orderId)', async () => {
    const response = await getConversation('44-112-2');
    expect(fetch).toHaveBeenCalledWith('../api/messages/44-112-2');
    expect(response).toMatchSnapshot();
  });
});
