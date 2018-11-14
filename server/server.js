const express = require('express');      // import express framework
const app = express();                   // instantiating express
const portNo = process.env.PORT || 3000; // set port number

const path = require('path');            // import path object

const body_parser = require('body-parser');        // import body-parser
app.use(body_parser.urlencoded({extended: true})); // use body-parser
app.use(body_parser.json());                       // parse body to json

// Set express listener at port 3000
var listener = app.listen(portNo, () => {
  const server_start_timestamp = new Date().toLocaleString();

  console.log('\n--- SERVER STATUS ---');
  console.log('Server Start Date:', server_start_timestamp);

  console.log('The Server is up and running!');
  console.log(`Access the website at: http://localhost:${portNo}`);
});



// Set path for file to ./dist
app.use(express.static(path.join(__dirname, '../dist')));

// All URL sends user to home page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
