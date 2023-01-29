var express = require('express');
var router = express.Router();
var con = require('../connection');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let sql = `SELECT *  FROM stokes`
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      res.send(result)
    }
  })
});

router.get('/myInfo', function (req, res) {
  let sql = `SELECT * FROM users WHERE user_id = ${req.body.id}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      res.send(result)
    }
  })
});

router.get('/myStokes', function (req, res) {
  let sql = `SELECT * FROM stoke_history WHERE owner_id = ${req.body.id}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      res.send(result)
    }
  })
});




module.exports = router;
