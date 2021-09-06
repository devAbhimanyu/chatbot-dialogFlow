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
    showBot: false,
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
    const allMsgs = [...this.state.messages, ...messages];
    console.log(allMsgs);
    this.setState({ messages: allMsgs });
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

  handleQuickReplyPayload = (event, payload, text) => {
    event.preventDefault();
    event.stopPropagation();
    switch (payload) {
      case 'recommended_yes':
        this.df_event_query('SHOW_RECOMMENDATIONS');
        break;
      case 'training_masterclass':
        this.df_event_query('MASTERCLASS');
        break;
      default:
        this.df_text_query(text);
        break;
    }
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
    if (this.messageRef)
      this.messageRef.scrollIntoView({ behaviour: 'smooth' });
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  toggleChatbot = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState((prev) => ({
      showBot: !prev.showBot,
    }));
  };

  render() {
    return (
      <div
        className={` ${styles.chatbot} ${
          this.state.showBot ? styles.open : ''
        }`}
      >
        <nav>
          <div className='nav-wrapper'>
            <a href='/' className='brand-logo left'>
              ChatBot
            </a>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              <li>
                <a href='/' onClick={this.toggleChatbot}>
                  {this.state.showBot ? 'Close' : 'Show'}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.showBot && (
          <div id='chatbot-secontion' className={styles.section}>
            <div
              style={{
                minHeight: 388,
                maxHeight: 388,
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Messages
                messages={this.state.messages}
                quickReplyHandler={this.handleQuickReplyPayload}
              />
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
        )}
      </div>
    );
  }
}

export default Chatbot;
