const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "yellowboylmao11",
    database: "employees_db"
});

connection.connect(err => {
    if (err) throw err;
  });

  module.exports = connection;