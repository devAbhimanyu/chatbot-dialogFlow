import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Cookie from 'universal-cookie';
import Messages from '../messages/Messages';
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
          <div
            style={{
              minHeight: 388,
              maxHeight: 388,
              width: '100%',
              overflow: 'auto',
            }}
          >
            <Messages messages={this.state.messages} />
            <div
              id='message-ref'
              ref={(el) => {
                this.messageRef = el;
              }}
            ></div>
          </div>

          <input
            ref={(el) => {
              this.inputRef = el;
            }}
            className={`col s12 ${styles.input}`}
            type='text'
            onKeyPress={this.inputChangeHandler}
            placeholder='Type to begin'
          />
        </div>
      </div>
    );
  }
}

export default Chatbot;
