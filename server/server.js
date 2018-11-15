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


// Place holder socket.io logic
io.on('connection', (socket) => {

  // Logic for when a new user joins the room
  socket.on('join', (room_id) => {
    socket.join(room_id);
  });


  // Makes user send there own user_info
  socket.on('request_attendance', (room_id) => {
    io.to(room_id).emit('request_attendance');
  });


  // Send user_info
  socket.on('attendance', (room_id, user_info) => {
    io.to(room_id).emit('attendance', user_info);
  });


  // Logic for when a user rolls a dice
  socket.on('roll', (roll_result) => {
    const roll_info = {
      user_id: roll_result.user_id,
      result_string: roll_result.result_string,
      total_val: roll_result.total_val
    };

    io.to(roll_result.room_id).emit('roll', roll_info);
  });


  socket.on('exit', (room_id, user_id) => {
    io.to(room_id).emit('exit', user_id);
  });

});
