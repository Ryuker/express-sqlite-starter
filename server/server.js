const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');

// middleware imports
const asyncHandler = require('./middleware/async');

const app = express();

// connect to DB
const db = new sqlite3.Database('./database/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message.red);
});


//////////////
// db stuff

/////////////////
/// Middleware //

function getUsers() {
  const query = 'SELECT * FROM users';

  return new Promise((resolve) => {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err.message.red);
      resolve(rows); 
    });
  });
}

function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = ${id}`;

  return new Promise((resolve) => {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err.message.red);
      resolve(rows); 
    });
  });
}


// Mount Routers
// Get all users from DB
app.get('/', asyncHandler( async (req, res, next) => {
  let data = await getUsers();

  console.log(data);

  res.status(200).json({
    success: true,
    data: data
  });
}));

// Get single user from db
app.get('/:id', asyncHandler( async (req, res, next) => {

  let data = await getUserById(req.params.id);

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
}));


///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);
