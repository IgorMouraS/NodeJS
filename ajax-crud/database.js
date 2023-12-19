const mysql = require('mysql2');

var connection = mysql.createConnection({

    host: 'localhost',
    database: 'testing',
    user: 'root',
    password: 'abcdefg'

});

connection.connect(function (error) {

    if (error) {
        throw error;
    } else {
        console.log('MySQL Database is connected Successfully');
    }

});

module.exports = connection;