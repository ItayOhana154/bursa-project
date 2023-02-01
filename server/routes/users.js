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

router.get(`/myStokes/portfilo/:userName`, function (req, res) {
  let portfilo = []
  let sql = `SELECT SUM(Quantity_purchased), stoke_name
  FROM stoke_history GROUP BY stoke_name 
  WHERE owner = '${req.params.userName}';`
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("resultttttttttt:", result);
      // console.log("resultttttttttt[0]:", result[0]);
      // console.log("resultttttttttt:[0].stoke_name", result[0].stoke_name);
      // res.send(result)
    }
  })
});

router.get(`/masseges/:id`, function (req, res) {
  console.log("req.params.id:", req.params.id);
  let sql = `SELECT Message  
  FROM Messages 
  WHERE person_id = ${req.params.id}`
  console.log("sql masseges/:id:", sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
      console.log("result masseges", result);
      res.send(result)
    }
  })
});

router.get('/getsymbul', function (req, res) {
  res.sendFile('/home/hilma/Desktop/mainProjects/bursa-project/server/public/images/symbul.png')
})



module.exports = router;
