import React, {Component} from 'react';

class Message extends Component{

  render(){
    console.log("Rendering Message");
    var spanStyle = {
      color: this.props.message.textColor
    }

    var imageStyle = {
      marginLeft: "130px"
    }

    switch (this.props.message.type){
      case 'incomingMessage':
        return(
          <div className="message">
                <span className="message-username" style = {spanStyle}> {this.props.message.username} </span>
                <span className="message-content"> {this.props.message.content} </span>
          </div>
        )
      case 'incomingNotification':
        return(
          <div className="message system">
            {this.props.message.notification}
          </div>
        )
      case 'imageMessage':
        return(
          <div className="message">
            <span className="message-username" style={spanStyle}> {this.props.message.username} </span>
            <img className = "message-content" style={imageStyle} src = {this.props.message.image_url} alt= {this.props.message.image_url} />
            <br/>
            <span className="message-content"> {this.props.message.content} </span>
          </div>
        )
      default:
        return(
          <div></div>
        )
    }
  }
}

export default Message;