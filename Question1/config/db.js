const mysql = require("mysql2");

const db = {
  host: "p3nlmysql173plsk.secureserver.net",
  user: "2200290129012",
  password: "Qwerty@123",
  database: "affordableMedical",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000, // 30 seconds
  rowsAsArray: false,
  enableKeepAlive: true,
  multipleStatements: true,
};

const connection = mysql.createPool(db);
connection.getConnection((err, conn) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Database connection established successfully.');
      conn.release(); // Release the connection back to the pool
    }
  });

module.exports = connection;