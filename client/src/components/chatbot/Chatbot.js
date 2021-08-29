import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Cookie from 'universal-cookie';
import Message from './Message';
import styles from './Chatbot.module.css';

const cookie = new Cookie();

class Chatbot extends Component {
  // constructor(props) {
  //   super(props);

  // }
  state = {
    messages: [],
  };
  messageRef = null;
  inputRef = null;
  df_text_query = async (text) => {
    const query = {
      speaks: 'me',
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState((prev) => ({
      messages: [...prev.messages, query],
    }));

    const res = await axios.post('/api/df_text_query', {
      text,
      userId: cookie.get('userId'),
    });
    const { fulfillmentMessages = [] } = res.data;
    const messages = fulfillmentMessages.map((msg) => {
      return {
        speaks: 'bot',
        msg,
      };
    });

    this.setState((prev) => ({
      messages: [...prev.messages, ...messages],
    }));
  };

  df_event_query = async (event) => {
    console.log(cookie.get('userId'));
    const res = await axios.post('/api/df_event_query', {
      event,
      userId: cookie.get('userId'),
    });
    const messages = res.data.fulfillmentMessages.map((msg) => {
      return {
        speaks: 'bot',
        msg,
      };
    });
    this.setState((prev) => ({
      messages: [...prev.messages, ...messages],
    }));
  };

  renderMessages = (messages) => {
    if (messages) {
      return messages.map((msg, i) => {
        console.log(msg);
        return (
          <Message
            key={`message-${i}`}
            speaks={msg.speaks}
            text={msg.msg.text.text}
          />
        );
      });
    } else return null;
  };

  inputChangeHandler = (e) => {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  };

  componentDidMount() {
    if (cookie.get('userId') === undefined)
      cookie.set('userId', uuid(), { path: '/' });
    this.df_event_query('welcome');
  }

  componentDidUpdate() {
    this.messageRef.scrollIntoView({ behaviour: 'smooth' });
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  render() {
    return (
      <div className={styles.chatbot}>
        <div id='chatbot' className={styles.section}>
          <h2>Chatbot</h2>
          {this.renderMessages(this.state.messages)}
          <div
            ref={(el) => {
              this.messageRef = el;
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
          <input
            ref={(el) => {
              this.inputRef = el;
            }}
            type='text'
            onKeyPress={this.inputChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default Chatbot;
