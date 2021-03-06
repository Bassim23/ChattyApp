import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map(message => (
            <Message
              key={message.id}
              {...message}
              />
            )
          )
        }
      </main>
    );
  }
}
export default MessageList;

/*

type={message.type}
id={message.id}
content={message.content}
username={message.username}

is equivalent to

{...message}

*****Destructuring ES6******
*/