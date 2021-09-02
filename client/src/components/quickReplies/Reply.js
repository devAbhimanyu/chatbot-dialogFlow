import React from 'react';

const Reply = ({ reply = {}, clickDelegate }) => {
  console.log(reply);
  if (reply.payload) {
    return (
      <a
        style={{ margin: 3 }}
        href='/'
        className='btn-floating btn-large waves-effect waves-light red'
        onClick={(event) =>
          clickDelegate(
            event,
            reply.payload.stringValue,
            reply.text.stringValue,
          )
        }
      >
        {reply.text.stringValue}
      </a>
    );
  } else {
    return (
      <a
        style={{ margin: 3 }}
        href={reply.link.stringValue}
        className='btn-floating btn-large waves-effect waves-light red'
      >
        {reply.text.stringValue}
      </a>
    );
  }
};
export default Reply;
