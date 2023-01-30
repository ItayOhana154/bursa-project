var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "bursa"
});

con.connect(function (err) {
    if (err) console.log('connection ERROE:', err);
})

module.exports = con