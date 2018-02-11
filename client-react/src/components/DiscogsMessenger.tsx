import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import DiscogsMessagesList from './DiscogsMessagesList';
import DiscogsConversation from './DiscogsConversation';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    '@media screen and (max-width: 860px)': {
      'flexDirection': 'column',
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
        <DiscogsConversation />
      </div>
    </div>
  );
}
