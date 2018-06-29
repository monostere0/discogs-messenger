import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getConversation } from '../api';
import Conversation from './Conversation';

const styles = StyleSheet.create({
  container: {
    minWidth: '200px',
    height: '100vh',
    position: 'relative',

    '@media screen and (max-width: 860px)': {
      height: '70vh',
    }
  }
});

type Props = { conversationId: string, match?: any };
type State = { conversation: any[] };

export default class ConversationContainer extends React.Component<Props, State> {
  props: Props;
  state: State = { conversation: [] };

  componentWillReceiveProps(nextProps: Props) {
    const { conversationId } = nextProps.match.params;
    this.getConversation(conversationId);
  }

  render() {
    const { conversation } = this.state;
    return (
      <div className={css(styles.container)}>
        <Conversation conversation={conversation} />
      </div>
    );
  }

  async getConversation(conversationId: string) {
    const conversation = await getConversation(conversationId);
    console.log(conversation);
    this.setState({ conversation });
  }
}