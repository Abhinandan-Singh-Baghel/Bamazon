const mysql = require('mysql');
require('dotenv').config();

const password = process.env.PASSWORD;



const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: password,
    database: 'bamazon'
});

// Connect to the mysql server

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
    
    // You can now execute queries or perform other database operations here
  });