import React from 'react';

import Message from './Message';

class Messages extends React.Component {
  componentDidUpdate() {
    // There is a new message, scroll to bottom of list
    const objDiv = document.querySelectorAll('.messages');
    objDiv.forEach(function(current){
      current.scrollTop = current.scrollHeight;
    });
  }

  render() {
    // Loop through all the messages Message component
    const messages = this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            username={message.username}
            message={message.message}
            fromMe={message.fromMe} />
        );
      });

    return (
      <div className='messages'>
        { messages }
      </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};

export default Messages;