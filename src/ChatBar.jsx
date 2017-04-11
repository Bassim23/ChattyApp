import React, {Component} from 'react';

class ChatBar extends Component {

  constructor (props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter'){
      this.props.newMessage(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>

    );
  }
}
export default ChatBar;