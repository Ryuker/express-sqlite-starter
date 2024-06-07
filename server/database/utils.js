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

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById
};
