import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import randomColor from 'random-color';

class App extends Component {
  socket = null;
  constructor(prop) {
    super();
    this.state={
      textColor: randomColor().hexString(),
      userCount: 0,
      currentUser: {name: "Abhi"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  updateUsername = (newName) => {
//    var content =
    this.socket.send(JSON.stringify({type: 'postNotification', notification: `${this.state.currentUser.name} has change their name to ${newName}`}))
  }

  updateMessageList = (user, message) => {
      const newMessage = {type: "postMessage", username: user || 'Anonymous', content: message, textColor:this.state.textColor};
      // console.log("message to server", JSON.stringify(newMessage));
      this.socket.send(JSON.stringify(newMessage));
  }

  handleWSReceive = (event) => {
    var messageObj = JSON.parse(event.data);
    // console.log(JSON.parse(event.data));
    if(messageObj.type === 'Error'){
      console.Error("Event Type: ", event.data.type);
    } else if (messageObj.type === 'updateCount') {
      this.setState({userCount: messageObj.userCount})
    } else {
      this.setState((prevState) => ({
        messages: prevState.messages.concat(messageObj)
      }));
    }
  }

  componentDidMount() {
    console.log("component did mount");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.addEventListener('open', function(event){
      console.log("connected to server!!");
    });
    this.socket.onmessage = this.handleWSReceive;
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-usercount">{this.state.userCount} users online </span>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser.name} updateMessageList = {this.updateMessageList} updateUsername = {this.updateUsername}/>
      </div>
    );
  }
}
export default App;
