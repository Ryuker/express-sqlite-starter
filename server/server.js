const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');

// middleware imports
const asyncHandler = require('./middleware/async');
const errorHandler = require('./middleware/error');

// utils
const ErrorResponse = require('./utils/errorResponse');

const app = express();

// connect to DB
const db = new sqlite3.Database('./database/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message.red);
});


//////////////
// db stuff

/////////////////
/// Middleware //

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      resolve(rows[0]); 
    });
  });
}

function addUser(body) {
  const {
    first_name,
    last_name,
    username,
    password,
    email,
  } = body;
  
  // TODO add validation

  // Setup query
  const query = `INSERT INTO users(first_name, last_name, username, password, email) VALUES (?,?,?,?,?)`;

  return new Promise((resolve) => {
    db.run(query, [
      first_name,
      last_name,
      username,
      password,
      email,
    ], function(err) {
      if (err) resolve(err);
      resolve(this.lastID); 
    });
  });
}

function updateUserById(id, body) {
  const columns = Object.entries(body);

  let columnsStr = "";

  columns.map((column, index) => {
    columnsStr += `${column[0]}= "${column[1]}"`;
    
    // add komma to any but the last column 
    if (columns.length > 1){
      if (index < columns.length -1)
        columnsStr += ',';
    }
  });

  // Setup query
  const query = `UPDATE users SET ${columnsStr} WHERE id = ?`;

  return new Promise((resolve) => {
    db.run(query, [
      id
    ], function(err) {
      if (err) resolve(err);
      resolve({id: id}); 
    });
  });
}

function deleteUserById(id) {
  // Setup query
  const query = `DELETE FROM users WHERE id = ?`;

  return new Promise((resolve) => {
    db.run(query, [
      id
    ], function(err) {
      if (err) resolve(err);
      resolve({id: id}); 
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

  if (data.length === 0) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  console.log(data);
  
  res.status(200).json({
    success: true,
    data: data
  });
}));

// Add single user to db
app.post('/', asyncHandler( async (req, res, next) => {
  
  const data = await addUser(req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error adding user to the database', 404));
  }
  
  const newUser = {data, ...req.body};

  console.log(newUser);
  
  res.status(200).json({
    success: true,
    data: newUser
  });
}));

// Update user by id
app.put('/:id', asyncHandler( async (req, res, next) => {
  
  const data = await updateUserById(req.params.id, req.body);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error updating user in the database', 404));
  }

  const updatedUser = await getUserById(data.id);

  console.log(updatedUser);
  
  res.status(200).json({
    success: true,
    data: updatedUser
  });
}));

// delete user by id
app.delete('/:id', asyncHandler( async (req, res, next) => {
  const user = await getUserById(req.params.id);

  const data = await deleteUserById(req.params.id);
  
  // check if there was an error adding to the database
  if (data.code) {
    console.error(data.message.red);
    return next(new ErrorResponse('Error deleting user from the database', 404));
  }

  console.log(user);
  
  res.status(200).json({
    success: true,
    message: `Deleted user ${user.username} with id ${data.id}`
  });
}));

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
