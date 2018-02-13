import * as React from 'react';
import { Route } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import DiscogsMessagesList from './DiscogsMessagesList';
import DiscogsConversationLoader from './DiscogsConversationLoader';

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

export default function DiscogsMessenger() {
  return (
    <div className={css(styles.container)}>
      <DiscogsMessagesList />
      <div className={css(styles.conversations)}>
        <Route
          path="/messages/:conversationId"
          exact={true}
          component={DiscogsConversationLoader} />
      </div>
    </div>
  );
}
