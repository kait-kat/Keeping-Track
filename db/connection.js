const mysql = require("mysq2l");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;