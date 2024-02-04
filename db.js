const mysql = require("mysql")

const connection = mysql.createConnection({
  user: "root",
  password: "root",
  host: "localhost",
  port: 3306,
  database: "ve3",
})

connection.connect()

module.exports = connection
