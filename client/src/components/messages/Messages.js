import React from 'react';
import Message from './Message';
import QuickReplies from '../quickReplies/QuickReplies';
import Cards from '../layout/cards/Cards';
const Messages = ({ messages = [], quickReplyHandler }) => {
  if (messages) {
    return messages.map((message, i) => {
      if (message?.msg?.text?.text) {
        return (
          <Message
            key={`message-${i}`}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      } else if (message?.msg?.payload?.fields.cards) {
        // console.log(message.msg.payload.fields.cards);
        return (
          <div key={`message-card-section-${i}`}>
            <div className='card-panel grey lighten-5 z-depth-1'>
              <div style={{ overflow: 'hidden' }}>
                <div className='col s2'>
                  <a
                    href='/'
                    className='btn-floating btn-large waves-effect waves-light red'
                  >
                    {message.speaks}
                  </a>
                </div>
                <Cards
                  cards={message.msg.payload.fields.cards.listValue.values}
                />
              </div>
            </div>
          </div>
        );
      } else if (message?.msg?.payload?.fields?.quick_replies) {
        return (
          <QuickReplies
            text={
              message.msg.payload.fields.text
                ? message.msg.payload.fields.text
                : null
            }
            key={i}
            replyClick={quickReplyHandler}
            speaks={message.speaks}
            payload={message.msg.payload.fields.quick_replies.listValue.values}
          />
        );
      }
      return null;
    });
  } else return null;
};

export default Messages;