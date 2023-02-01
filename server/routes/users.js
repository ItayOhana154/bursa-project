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

router.get(`/myStokes/portfilo/:userName`, function (req, res) {
  let sum = 0;
  let sql = `SELECT SUM(Quantity_purchased), stoke_name
  FROM stoke_history 
  WHERE owner = '${req.params.userName}'
  GROUP BY stoke_name;`
  // console.log("sqllllllllllll portfilo:", sql);
  con.query(sql, async function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      let dataCheck;
      let QuaryPromise = (sql) => new Promise((resolve, reject) => {
        con.query(sql, function (err, price) {
          if (err) {
            console.log(err);
            return;
          }
          resolve(price)
        })
      })
      for (let i = 0; i < result.length; i++) {
        sql = `SELECT stoke_price
        FROM stokes 
        WHERE stoke_name = '${result[i].stoke_name}';`
        const price = await QuaryPromise(sql)

        sum = sum + (price[0].stoke_price * result[i]['SUM(Quantity_purchased)'])
      }
    }
    res.send({ ans: sum });
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
  res.sendFile('/home/hilma/projects/projectWithOhana/bursa-project/server/public/images/symbul.png')
})



module.exports = router;
