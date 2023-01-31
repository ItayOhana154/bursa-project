var express = require('express');
var router = express.Router();
var con = require('../connection');

router.post('/login', function (req, res) {
    let sql = `SELECT users.*,
    passwords.password FROM users
    INNER JOIN passwords
    ON users.id = passwords.id
    WHERE users.user_name = '${req.body.username}'
    AND passwords.password = '${req.body.password}'`
    
    con.query(sql, function (err, user) {
        console.log(user);
        if (err) {
            console.log(err);
            res.send(JSON.stringify({ "answer": user, "bool": false }))
        };
        res.send(JSON.stringify({ "answer": user, "bool": true }));
    })
});

module.exports = router;