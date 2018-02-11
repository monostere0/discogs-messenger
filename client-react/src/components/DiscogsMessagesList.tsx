import * as React from 'react';
import styleConstants from './styleConstants';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getMessages } from '../api';

const styles = StyleSheet.create({
  container: {
    flex: '1 0 0',
    minWidth: '200px',
    borderRight: `2px solid ${styleConstants.middleBarColor}`,
    height: '100vh',

    '@media screen and (max-width: 860px)': {
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
      width: '100%',
      height: '30vh',
      borderRight: 'none',
      borderBottom: `2px solid ${styleConstants.middleBarColor}`,
    },
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  message: {
    padding: '15px 20px',
    borderBottom: '1px solid #eee',
    position: 'relative',
    transition: 'background-color ease-in .2s',
    ':hover': {
      backgroundColor: '#f8f8f8',
    },
  },
  avatar: {
    height: '50px',
    borderRadius: '50%',
    opacity: 0.8,
    marginLeft: '-10px',
    verticalAlign: 'top',
    transition: 'transform ease-out .2s',
  },
  receivedLabel: {
    position: 'absolute',
    right: '5%',
    top: 'calc(55% -12px)',
    fontSize: '12px',
    color: '#ababab',
  },
  messageInfo: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  author: {
    fontSize: '20px',
    color: '#ababab',
  },
});

export default class DiscogsMessagesList extends React.Component {
  state: { messages: any[] } = { messages: [] };

  componentDidMount() {
    this.getMessages();
  }

  render() {
    const { messages } = this.state;
    return (
      <div className={css(styles.container)}>
        {messages.length && <ul className={css(styles.list)}>
          {messages.map(message => (
            <li key={message.id} className={css(styles.message)}>
              <img
                className={css(styles.avatar)}
                src={message.avatar}
              />
              <div className={css(styles.messageInfo)}>
                <span className={css(styles.author)}>{message.from}</span>
                <span>{message.preview}</span>
              </div>
              <span className={css(styles.receivedLabel)}>{message.received}</span>
            </li>
          ))}
        </ul>}
      </div>
    );
  }

  async getMessages() {
    const messages = await getMessages();
    console.log(messages);
    this.setState({ messages });
  }
}
