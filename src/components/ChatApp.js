require('../styles/ChatApp.css');

import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], typing: 'notTyping', otherUser: ''};

    //bind 'this' to event handlers
    this.sendHandler = this.sendHandler.bind(this);
    this.typingHandler = this.typingHandler.bind(this);

    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
    this.socket.on('server:typing', data => {
      if(data.value == true){
        this.setState({typing: 'typing'});
      } else{
        this.setState({typing: 'notTyping'});
      }
      this.setState({otherUser: data.username});
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  typingHandler(value){
      const data = {
        username: this.props.username,
        value: value
      }
      this.socket.emit('client:typing', data);
  }

  render() {
    return (
      <div className="container">
        <h3>Chatter</h3>
        <Messages messages={this.state.messages} />
        <div className={this.state.typing}>{this.state.otherUser} is typing</div>
        <ChatInput onSend={this.sendHandler} onTyping={this.typingHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;