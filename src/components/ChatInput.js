import React from 'react';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    //bind 'this' to event handlers
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  
  submitHandler(event) {
    event.preventDefault();

    // Clear the input box
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
  }

  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }
  handleFocus(){
    this.props.onTyping(true);
  }
  handleBlur(){
    this.props.onTyping(false);
  }
  render() {
    return (
      <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
        <input className="sendBtn" type="submit" value="Send" />
      </form>
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;