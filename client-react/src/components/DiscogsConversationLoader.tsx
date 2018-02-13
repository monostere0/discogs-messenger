import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { getConversation } from '../api';
import DiscogsConversation from './DiscogsConversation';

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

export default class DiscogsConversationLoader extends React.Component<Props, State> {
  props: Props;
  state: State = { conversation: [] };

  componentWillReceiveProps(props: Props, nextProps: Props) {
    this.getConversation();
  }

  componentDidMount() {
    this.getConversation();
  }

  render() {
    const { conversation } = this.state;
    return (
      <div className={css(styles.container)}>
        <DiscogsConversation conversation={conversation} />
      </div>
    );
  }

  async getConversation() {
    const { conversationId } = this.props.match.params;
    const conversation = await getConversation(conversationId);
    this.setState({ conversation });
  }
}