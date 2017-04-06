import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="message">
        <span className="message-username">{this.props.newMessage.username}</span>
        <span className="message-content">{this.props.newMessage.content}</span>
      </div>

    );
  }
}
export default Message;
