import * as React from 'react';
import { Route } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import MessagesList from './MessagesList';
import ConversationContainer from './ConversationContainer';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    '@media screen and (max-width: 860px)': {
      'flexDirection': 'column',
      'height': '100vh'
    },
  },
  conversations: {
    flex: '3 0 0',
    '@media screen and (max-width: 860px)': {
      'width': '100%',
    },
  },
});

export default function MessengerContainer() {
  return (
    <div className={css(styles.container)}>
      <MessagesList />
      <div className={css(styles.conversations)}>
        <Route
          path="/messages/:conversationId"
          exact={true}
          component={ConversationContainer} />
      </div>
    </div>
  );
}
