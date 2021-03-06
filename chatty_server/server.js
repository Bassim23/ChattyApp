const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const http = require('http');
const uuidV1 = require('uuid/v1');

const TYPES = require('./message_types.js');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function broadcastUserCount() {
  wss.broadcast({
    id: uuidV1(),
    type: TYPES.USER_COUNT,
    userCount: wss.clients.size
  });
}

function broadcastMessage(username, content)
{
  wss.broadcast({
    id: uuidV1(),
    type: TYPES.INCOMING_MESSAGE,
    username: username,
    content: content
  });
}

function broadcastNotification(content)
{
  wss.broadcast({
    id: uuidV1(),
    type: TYPES.INCOMING_NOTIFICATION,
    content
  });
}

wss.on('connection', (client) => {
  client.username = 'Anonymous'
  console.log('Client connected');

  broadcastUserCount();
  broadcastNotification('User connected');

  client.on('message', function incoming(data) {
    const message = JSON.parse(data);

    // console.log(message);

    if(message.content && message.username) {
      broadcastMessage(message.username, message.content);
    } else if (message.oldUsername && message.newUsername) {
      client.username = message.newUsername;
      broadcastNotification(`User ${message.oldUsername} changed their name to ${message.newUsername}`)
    }

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    broadcastUserCount();
    broadcastNotification(`User ${client.username} disconnected`);
    console.log('Client disconnected');
  });

});