import React, { Component } from 'react';
import Reply from './Reply';

class QuickReplies extends Component {
  handleClick = (event, payload, text) => {
    this.props.replyClick(event, payload, text);
  };

  render() {
    const { speaks, text, payload } = this.props;
    return (
      <div className='col s12 m8 offset-m2 l6 offset-l3'>
        <div className='card-panel grey lighten-5 z-depth-1'>
          <div className='row valign-wrapper'>
            <div className='col s2'>
              <a
                href='/'
                className='btn-floating btn-large waves-effect waves-light red'
              >
                {speaks}
              </a>
            </div>
            <div id='quick-replies' className='col s10 center'>
              {text.stringValue && <p>{text.stringValue}</p>}
              {payload
                ? payload.map((reply, i) => (
                    <Reply
                      key={`reply-${i}`}
                      clickDelegate={this.handleClick}
                      reply={reply.structValue.fields}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default QuickReplies;
