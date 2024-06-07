const sqlite3 = require('sqlite3').verbose();
const colors = require('colors');

// connect to DB
const db = new sqlite3.Database('./database/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message.red);
});


// database methods
function getAllRows(table) {
  const query = `SELECT * FROM ${table}`;

  return new Promise((resolve) => {
    db.all(query, [], (err, rows) => {
      if (err) resolve(err.message.red);
      resolve(rows); 
    });
  });
}

function getRowById(table,id) {
  const query = `SELECT * FROM ${table} WHERE id = ${id}`;

  return new Promise((resolve) => {
    db.get(query, [], (err, rows) => {
      if (err) resolve(err.message.red);
      resolve(rows[0]); 
    });
  });
}

function addRow(table, body) {
  const keys = Object.keys(body);
  
  let params = "";
  keys.map((key, index) => {
    if (index == 0)
      params += `${key}`
    else
      params += `, ${key}`
  });

  let valuesStr = "";
  keys.map((key, index) => {
    if (index == 0)
      valuesStr += `?`
    else
      valuesStr += `,?`
  });

  let paramValues = keys.map(key => body[key]);

  // TODO add validation

  // Setup query
  const query = `
    INSERT INTO ${table}(${params}) 
    VALUES (${valuesStr})
  `;

  return new Promise((resolve) => {
    db.run(query, paramValues, function(err) {
      if (err) resolve(err);
      resolve(this.lastID); 
    });
  });
}

function updateRowById(table, id, body) {
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
  const query = `UPDATE ${table} SET ${columnsStr} WHERE id = ?`;

  return new Promise((resolve) => {
    db.run(query, [
      id
    ], function(err) {
      if (err) resolve(err);
      resolve({id: id}); 
    });
  });
}

function deleteRowById(table, id) {
  // Setup query
  const query = `DELETE FROM ${table} WHERE id = ?`;

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
  getAllRows,
  getRowById,
  addRow,
  updateRowById,
  deleteRowById
};
