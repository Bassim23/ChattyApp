import React, {Component} from 'react';

class ChatBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      userName: props.currentUser
    }
    this.handleKeyPressMsg = this.handleKeyPressMsg.bind(this);
    this.handleKeyPressUsr = this.handleKeyPressUsr.bind(this);
  }

  handleKeyPressMsg(event) {
    if (event.key === 'Enter'){
      this.props.newMessage(event.target.value);
      event.target.value = '';
    }
  }

  handleKeyPressUsr(event){
    if (event.key === 'Enter') {
      this.props.newUser(this.state.userName);
    }
  }

  onUsernameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.onUsernameChange}  value={this.state.userName} onKeyPress={this.handleKeyPressUsr}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPressMsg} />
      </footer>

    );
  }
}
export default ChatBar;