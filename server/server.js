const express = require('express');           // import express framework
const app     = express();                    // instantiating express
const http    = require('http');              // import http package
const server  = http.Server(app);             // Create server
const io      = require('socket.io')(server); // set socket.io with server

const portNo  = process.env.PORT || 3000; // set port number

const path = require('path');            // import path object

const body_parser = require('body-parser');        // import body-parser
app.use(body_parser.urlencoded({extended: true})); // use body-parser
app.use(body_parser.json());                       // parse body to json

// Set express listener at port 3000
var listener = server.listen(portNo, () => {
  const server_start_timestamp = new Date().toLocaleString();

  console.log('\n--- SERVER STATUS ---');
  console.log('Server Start Date:', server_start_timestamp);

  console.log('The Server is up and running!');
  console.log(`Access the website at: http://localhost:${portNo}`);
});


// Set path for file to ./dist
app.use(express.static(path.join(__dirname, '../dist')));


// GET new room id to host a new room.
app.get('/new_room_id', (req, res) => {
  let room_id = '';
  do {
    room_id = Math.random().toString().slice(2,6);
  } while(!!io.sockets.adapter.rooms[room_id]);
  res.json({result: room_id});
});


// GET check if room id to join exists
app.get('/check_room_id', (req, res) => {
  let result = true;
  if(!!io.sockets.adapter.rooms[req.query.room_id]){
    result = false;
  }
  res.json({result: result});
});


// All URL sends user to home page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var user_count = 0;

// Place holder socket.io logic
io.on('connection', (socket) => {
  socket.display_name = 'User' + ++user_count;
  console.log('A user has connected to a socket:', socket.client.id, '/ user display_name:', socket.display_name);

  // Logic for when a new user joins the room
  socket.on('join', (room_id) => {
    socket.join(room_id);

    let room_info = {};

    for (socket_id in io.sockets.adapter.rooms[room_id].sockets){
      room_info[socket_id] = io.sockets.sockets[socket_id].display_name;
    }

    io.to(room_id).emit('room_info', room_info);
  });

  // Logic for when a user rolls a dice
  socket.on('roll', (user_roll_info) => {
    const roll_info = {
      user_id: user_roll_info.user_id,
      result_string: user_roll_info.result_string,
      total_val: user_roll_info.total_val
    };

    io.to(user_roll_info.room_id).emit('roll', roll_info);
  })

});
