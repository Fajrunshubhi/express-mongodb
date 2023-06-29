const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "Fajrun",
    password: "FajrunSH12",
    database: "node-complete",
});

connection.connect((err) => {
    if (err) {
        console.log("error connection: " + err.stack);
        return;
    } else {
        console.log("connected as id " + connection.threadId);
    }
});

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//     if (error) throw error;
//     console.log("The solution is: ", results[0].solution);
// });

// connection.end();

module.exports = connection;
