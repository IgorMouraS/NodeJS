const express = require('express');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'testing',
    user: 'root',
    password: 'abcdefg'
});

var database_connection_status = '';

connection.connect(function (error) {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        database_connection_status = '<h3>MySQL Database Connection Error</h3>';
    } else {
        console.log('Connected to MySQL database');
        database_connection_status = '<h3>Node JS Application Succesfully connect to MySQL Database</h3>';
    }
});

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (request, response, next) {
    response.send(`
        <h1>Submit Form Data In Node.js</h1>
        `+ database_connection_status + `

        <form method="post" action="">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" id="first_name">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" id="last_name">
            <label for="email_address">Email Address</label>
            <input type="email" name="email_address" id="email_address">
            <input type="submit" name="submit_button" value="Add">
        </form>
    `);
});

app.post('/', function (request, response, next) {
    response.send(request.body);
});

app.listen(2000);