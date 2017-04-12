import React, {Component} from 'react';

class Message extends Component {
  render() {

    const { type, username, content } = this.props;

    // const type = this.props.type;
    // const username = this.props.username;
    // const content = this.props.content;
    // console.log('Rendering message', type, username, content);
    switch(type) {

      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
          </div>
        )
      case "incomingNotification":
        return (
          <div className="message system">
            <span className="message-content">{content}</span>
          </div>
        );
    }
  }
}
export default Message;



// Dumb component version below

// function Message(props) {
//   const { type, username, content } = props;

//     // const type = this.props.type;
//     // const username = this.props.username;
//     // const content = this.props.content;
//     // console.log('Rendering message', type, username, content);
//   switch(type) {

//     case "incomingMessage":
//       return (
//         <div className="message">
//           <span className="message-username">{username}</span>
//           <span className="message-content">{content}</span>
//         </div>
//       )
//     case "incomingNotification":
//       return (
//         <div className="message system">
//           <span className="message-content">{content}</span>
//         </div>
//       );
//   }
// };

// export default Message;
