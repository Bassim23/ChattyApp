import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };

    this.newMessage = this.newMessage.bind(this);
  }

  newMessage (newContent) {
    // let messages = this.state.messages;
    let newMsg = ({
      username: this.state.currentUser.name,
      content: newContent
    })
    this.socket.send(JSON.stringify(newMsg))
    // this.setState({messages: newMsg});
  }

  updateMessages(newMessage) {
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages});
  }

  componentDidMount() {
  // Open a connection
  this.socket = new WebSocket('ws://localhost:3001/');

  // When a connection is made...
  this.socket.onopen = () => {
    console.log('Connected to server');
    const updateMessage = this.updateMessages.bind(this);
    this.socket.onmessage = function(event){
      // console.log(JSON.parse(e.data));
      updateMessage(JSON.parse(event.data));
    }
  }


  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
       <MessageList messages={this.state.messages} />
       <ChatBar currentUser={this.state.currentUser.name} newMessage={this.newMessage} />
      </div>
    );
  }



}

export default App;
