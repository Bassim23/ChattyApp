import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <main className="messages">
         {
          this.props.messages.map((currentMessage) => {
            return <Message newMessage={currentMessage} key={currentMessage.id} />
          })
         }
      </main>
    );
  }
}
export default MessageList;