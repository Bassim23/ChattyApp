import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import TYPES from '../../chatty_server/message_types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      userCount: 0
    };

    // this.newMessage = this.newMessage.bind(this);
    // this.newUser = this.newUser.bind(this);
  }

  /**
   * username: String name of the user
   * content: String message text
   */
  sendPayload(payload) {
    this.socket.send(JSON.stringify(payload));
  }

  sendMessage(username, content) {
    this.sendPayload({
      username,
      content
    })
  }

  sendUsername(oldUsername, newUsername) {
    this.sendPayload({
      oldUsername,
      newUsername
    })
  }


  newMessage = (content) => {
    // let messages = this.state.messages;
    const username = this.state.currentUser.name

    this.sendMessage(username, content);

    // this.setState({messages: newMsg});
  }

  newUser = (username) => {
    // let newName = {
    //   username: name
    // }
    // this.socket.send(JSON.stringify(newName))
    this.sendUsername(this.state.currentUser.name, username);
    this.setState({ currentUser: { name: username }});
  }

  updateMessages(newMessage) {
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages});
  }

  updateUserCount(payload) {
    this.setState({ userCount: payload.userCount });
  }

  componentDidMount() {
  // Open a connection
    this.socket = new WebSocket('ws://localhost:3001/');
    // When a connection is made...
    this.socket.onopen = () => {
      console.log('Connected to server');
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('onMessage', data);
        switch(data.type)
        {
          case TYPES.INCOMING_MESSAGE:
          case TYPES.INCOMING_NOTIFICATION:
            this.updateMessages(data);
            break;
          case TYPES.USER_COUNT:
            this.updateUserCount(data);
            break;

        }
        console.log('Received', data);

      };
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <div className="navbar-right">Users online: {this.state.userCount}</div>
        </nav>
         <MessageList messages={this.state.messages} />
         <ChatBar currentUser={this.state.currentUser.name} newMessage={this.newMessage} newUser={this.newUser}/>
      </div>
    );
  }

}

export default App;
