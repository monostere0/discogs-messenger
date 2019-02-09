import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Button, Input } from 'antd';
import styleConstants from './styleConstants';

const styles = StyleSheet.create({
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
  avatar: {
    height: '50px',
    borderRadius: '50%',
    opacity: 0.8,
    marginLeft: '-10px',
    verticalAlign: 'top',
    transition: 'transform ease-out .2s',
  },
  inbound: {},
  outbound: {
    backgroundColor: styleConstants.menuBackground,
    color: '#fff',
    float: 'right',
  },
  system: {
    backgroundColor: 'transparent',
    float: 'left',
    color: styleConstants.middleBarColor,
    width: '98%',
    border: `dashed 1px ${styleConstants.middleBarColor}`,
    textAlign: 'center',
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
    marginLeft: '10px',
  }
});

type Props = { conversation: any[] };

export default class DiscogsConversation extends React.Component {
  props: Props;

  render() {
    const { conversation } = this.props;
    return (
      <div>
        <ul className={css(styles.messages)}>
          {conversation.map((entry: any, index) => (
            <li
              className={css(
                styles.message,
                styles[entry.type],
              )}
              key={index}>
              {entry.type !== 'system' && <img className={css(styles.avatar)} src={entry.avatar} />}
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
}