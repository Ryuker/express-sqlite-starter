const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();

let sql;

// connect to DB
const db = new sqlite3.Database('./database/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message.red);
});


// Create table
// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)';
// db.run(sql);

// Drop table
// db.run('DROP TABLE users');

// Insert data into table
// sql = 'INSERT INTO users(first_name, last_name, username, password, email) VALUES (?,?,?,?,?)';
// let values = [
//   // "nike", "michaelson", "mike_user", "test", "mike@gmail.com"
//   "fred", "fredson", "fred_user", "testtwo", "fred@gmail.com"
// ];

// db.run(sql, values, err => {
//   if (err) return console.error(err.message);
// });

// update data
// sql = 'UPDATE users SET first_name = ? WHERE id = ?';
// db.run(sql, ['mike', 2], (err) => {
//   if (err) return console.error(err.message);
// })

// delete data
// sql = 'DELETE FROM users WHERE id = ?';
// db.run(sql, [2], (err) => {
//   if (err) return console.error(err.message);
// })

// Query the data
// Log whole table to the console
sql = 'SELECT * FROM users';
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message.red);
    rows.forEach(row => {
      console.log(row);
    });
});
