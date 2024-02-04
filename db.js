const mysql = require("mysql")

const connection = mysql.createConnection({
  user: "root",
  password: "root",
  host: "127.0.0.1",
  port: 3306,
  database: "ve3",
})

connection.connect()

module.exports = connection
