import React, {Component} from 'react';

class ChatBar extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: props.currentUser || 'Anonymous',
      message: props.message || ''
    };
  }

  handleUsername = (ev) => {
      if(ev.key === 'Enter'){
        console.log("chaning user name")
        this.props.updateUsername(ev.target.value);
      }
  }

  handleMessage = (ev) => {
    this.setState({message: ev.target.value})
    if (ev.key === "Enter"){
      ev.target.value = ""
      this.props.updateMessageList(this.state.user, this.state.message);
    }
  }

  render(){
    return(
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Anonymous"
          value ={this.state.user}
          onChange={(e) => this.setState({user: e.target.value})}
          onKeyPress = {this.handleUsername}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp= {this.handleMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;