// const express = require('express')
// const app = express()

// const PORT = process.env.PORT || 3030
// const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

// const messages = [
//   {
//     channel: "1",
//     account: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
//     text: "Welcome Dear Patient, this is your doctor here"
//   },
// ]

// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000"
//   }
// })

// io.on('connection', (socket) => {
//   console.log('a user connected')

//   socket.on('get messages', () => {
//     io.emit('get messages', messages)
//   })

//   socket.on('new message', (msg) => {
//     messages.push(msg)
//     io.emit('new message', messages)
//   })
// })







const express = require('express');
const app = express();

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`));

const messages = [
  {
    channel: "1",
    account: "Doctor",
    text: "Welcome Dear Patient, this is your doctor here",
  },

];

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('get messages', () => {
    io.emit('get messages', messages);
  });

  socket.on('new message', (msg) => {
    const messageObj = { ...msg, timestamp: Date.now() };
    messages.push(messageObj);
    io.emit('new message', messages);

    console.log('New message received at:', new Date(messageObj.timestamp).toISOString());
  });
});
