var express = require('express');
var router = express.Router();
var con = require('../connection');

router.post('/', function (req, res) {
    let sql = `INSERT INTO passwords ( password, username, isExist )  VALUES ('${req.body.password}', '${req.body.username}', 1)`
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            createUser(req, res);
        }
    })
});

function createUser(req, res) {
    let sql = `INSERT INTO users (username, phone_num, email, bank_num, creditCard_num, user_type, isExist ) VALUES ('${req.body.username}', '${req.body.phone_num}', '${req.body.email}', ${req.body.bank_num}, '${req.body.creditCard_num}', 0, 1)`

    console.log('sql: ', sql);
    con.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            res.send('true')
        }
    })
}

module.exports = router;

