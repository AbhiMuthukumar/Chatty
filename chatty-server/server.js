// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidV4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  wss.broadcastCount();
  console.log('Client connected', wss.clients.size);
  client.on('message',wss.broadcast)

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    wss.broadcastCount();
    console.log('Client disconnected', wss.clients.size);
  });
});

wss.broadcastCount = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(JSON.stringify({type:"updateCount", userCount: wss.clients.size}))
    }
  });
}

wss.broadcast = (message) => {
  let messageObj = JSON.parse(message);
  wss.clients.forEach((client) => {
    if (client.readyState === SocketServer.OPEN) {
      switch (messageObj.type){
        case 'postMessage':

          let replacedMessage = "";
          var image_url = (/https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)/ig).exec(messageObj.content);
          if(image_url){
            replacedMessage = (messageObj.content).replace(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)/ig,"");
            client.send(JSON.stringify({
              id: uuidV4(),
              type: 'imageMessage',
              username: messageObj.username,
              content: replacedMessage,
              image_url: image_url[0],
              textColor: messageObj.textColor
            }));
          } else {
            client.send(JSON.stringify({
              id: uuidV4(),
              type: 'incomingMessage',
              username: messageObj.username,
              content: messageObj.content,
              textColor: messageObj.textColor
            }));
          }
          break;
        case 'postNotification':
          client.send(JSON.stringify({
            id: uuidV4(),
            type: 'incomingNotification',
            notification: messageObj.notification
          }));
          break;
        default:
          client.send(JSON.stringify({
            type: "Error"
          }));
      }
    }
  })
}