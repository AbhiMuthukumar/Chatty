import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component{

render(){
    console.log("rendering MessageList");
    return(
      <main className="messages">
      {
        this.props.messages.map((message) => (
          <Message key = {message.id} message = {message} />)
        )
      }
      </main>
    );
  }
}

export default MessageList;
