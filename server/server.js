const colors = require('colors');
const express = require('express');

// middleware imports
const asyncHandler = require('./middleware/async');
const errorHandler = require('./middleware/error');

// utils
const ErrorResponse = require('./utils/errorResponse');

const app = express();

// Route files
const users = require('./routes/users.js');

//////////////
// db stuff

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Mount Routers
app.use('/', users);

// - Error Handler
app.use(errorHandler);

///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);
