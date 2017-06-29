require('../styles/App.css');
require('../styles/Login.css');

import React from 'react';
import ChatApp from './ChatApp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

    // Bind 'this' to event handlers
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.submitUsernameHandler = this.submitUsernameHandler.bind(this);
  }

  changeUsernameHandler(event) {
    this.setState({ username: event.target.value });
  }

  submitUsernameHandler(event) {
    event.preventDefault();
    this.setState({ submitted: true, username: this.state.username });
  }

  render() {
    if (this.state.submitted) {
      // Form was submitted, now show the main App
      return (
        <ChatApp username={this.state.username} />
      );
    }

    // Initial page load, show a simple login form
    return (
      
      <form onSubmit={this.submitUsernameHandler} className="username-container">
        <img className="logo" src="../img/plane.png" alt="chatter logo"/>
        <h1>Chatter</h1>
        <div>
          <input
            type="text"
            onChange={this.changeUsernameHandler}
            placeholder="Pick a username..."
            required />
        </div>
        <input type="submit" value="Enter chat" />
      </form>
    );
  }

}
App.defaultProps = {
};

export default App;