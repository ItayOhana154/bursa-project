var express = require('express');
var router = express.Router();
var con = require('../connection');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   let sql = `SELECT *  FROM stokes`
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     else {
//       res.send(result)
//     }
//   })
// });

router.get('/myInfo/:id', function (req, res) {
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      res.send(result)
    }
  })
});

router.get(`/myStokes/:userName`, function (req, res) {
  let sql = `SELECT stoke_name, Quantity_purchased 
  FROM stoke_history 
  WHERE owner = '${req.params.userName}'`
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      res.send(result)
    }
  })
});




module.exports = router;
