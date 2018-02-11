import * as React from 'react';
import { getMessages } from '../api';

export default class DiscogsMessagesList extends React.Component {
  state: { messages: any[] };

  componentDidMount() {
    this.getMessages();
  }

  render() {
    const { messages } = this.state;
    return (
      <div className="DiscogsMessagesList">
        {messages.length && <ul className="DiscogsMessagesList__list">
          {messages.map(message => (
            <li key={message.id} className="DiscogsMessagesList__list__message">
              <img
                className="DiscogsMessagesList__list__message__avatar"
                src={message.avatar} />
                <div className="DiscogsMessagesList__list__message__info">
                  <span className="DiscogsMessagesList__list__message__info__author">{message.from}</span>
                  <span className="DiscogsMessagesList__list__message__info__preview">{message.preview}</span>
                </div>
              <span className="DiscogsMessagesList__list__message__received">{message.received}</span>
            </li>
          ))}
        </ul>}
      </div>
    )
  }

  async getMessages() {
    const messages = await getMessages();
    this.setState({ messages });
  }
}