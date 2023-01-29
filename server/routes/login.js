var express = require('express');
var router = express.Router();
var con = require('../connection');

router.post('/', function (req, res) {
    let sql = `SELECT users.username, passwords.password FROM users
    INNER JOIN passwords
    ON users.id = passwords.id
    WHERE users.username = '${req.body.username}'
    AND passwords.password = '${req.body.password}'`
    
    console.log('sql: ', sql);
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.send('there is a problem')
        };
        res.send(true);
    })
});

module.exports = router;