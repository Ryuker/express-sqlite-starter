const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');

let sql;

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
  return new Promise((resolve) => {
    db.all(sql, [], (err, rows) => {
      if (err) resolve(err.message.red);
      resolve(rows); 
    });
  });
}


// Mount Routers
app.get('/', async (req, res) => {
  try {
    sql = 'SELECT * FROM users';
  
    let data = await getUsers();

    console.log(data);
    res.send(data);

  } catch(err){
    console.log(err);
    res.senderror(err);
  }
  
})


///////////
/// run the server
server = app.listen(
  5000,
  (() => {
    console.log('Server running on port 5000');
  })
);
