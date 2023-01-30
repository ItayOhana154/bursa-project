var express = require('express');
var router = express.Router();
var con = require('../connection');

router.get('/main', function (req, res) {
    console.log("req.body:", req.body);
    let sql = `SELECT * FROM stokes`
    con.query(sql, function (err, result) {
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
});


module.exports = router;

