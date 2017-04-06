import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
       <MessageList messages={this.state.messages} />
      <div className="message system">Anonymous1 changed their name to nomnom.
      </div>
       <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
