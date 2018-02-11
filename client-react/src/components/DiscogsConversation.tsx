import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getConversation } from '../api';
import { Button, Input } from 'antd';
import styleConstants from './styleConstants';

const styles = StyleSheet.create({
  container: {
    minWidth: '200px',
    height: '100vh',
    position: 'relative',

    '@media screen and (max-width: 860px)': {
      height: '70vh',
    }
  },
  messages: {
    margin: 0,
    padding: '10px',
    listStyle: 'none',
  },
  message: {
    padding: '10px',
    backgroundColor: styleConstants.middleBarColor,
    borderRadius: '10px',
    margin: '5px 10px',
    float: 'left',
    width: '80%'
  },
  messageOutbound: {
    backgroundColor: styleConstants.menuBackground,
    color: '#fff',
    float: 'right',
  },
  messageInputContainer: {
    padding: '10px 20px',
    position: 'absolute',
    width: '100%',
    bottom: '0px'
  },
  messageInput: {
    width: 'calc(100% - 140px)',
    display: 'inline-block',
  },
  messageSend: {
    width: '120px',
    verticalAlign: 'bottom',
  }
});

export default class DiscogsConversation extends React.Component {
  state: { conversation: any[] } = { conversation: [] };

  componentDidMount() {
    this.getConversation();
  }

  render() {
    const { conversation } = this.state;
    return (
      <div className={css(styles.container)}>
        <ul className={css(styles.messages)}>
          {conversation.map((entry: any) => (
            <li
              className={css(
                styles.message,
                entry.outbound && styles.messageOutbound
              )}
              key={entry.timestamp}>
              {entry.message}
            </li>
          ))}
        </ul>
        <div className={css(styles.messageInputContainer)}>
          <form>
            <Input type="text" className={css(styles.messageInput)} />
            <Button type="primary" className={css(styles.messageSend)}>Send</Button>
          </form>
        </div>
      </div>
    );
  }

  async getConversation() {
    const conversation = await getConversation('22');
    this.setState({ conversation });
  }
}