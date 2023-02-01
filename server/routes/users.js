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
  WHERE owner_name = ${req.params.userName}`
  console.log('sql: ', sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      console.log('req: ', req.params.userName);
      console.log('resss', result);
      res.send(result)
    }
  })
});



router.get('/getsymbul', function (req, res) {
  res.sendFile('/home/hilma/Desktop/mainProjects/bursa-project/server/public/images/symbul.png')
})



module.exports = router;
