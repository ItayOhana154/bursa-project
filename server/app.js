let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mysql = require('mysql');
let fs = require("fs")
const cors = require("cors")


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let stoksArrRouter = require('./routes/stokes')


let app = express();
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sparkLog', loginRouter);
app.use('/sparkReg', registerRouter); 
app.use('/spark',stoksArrRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function readAndCreate(fileName) {
  let dataArr = [];
  const data = fs.readFileSync(`./DB/${fileName}.json`, {encoding:'utf8', flag:'r'});
  let myData = JSON.parse(data)
      for (let i = 0; i < myData.fields.length; i++) {
        let rand = Math.floor(Math.random()* 500)
         dataArr.push(
          {
            name: myData.fields[i].companyName,
            id: i,
            Quantity: rand,
            price: Math.floor(Math.random()* 1000),
            free_stoks: rand,
            is_exist: 1,
            }
          )
      }
    return dataArr;
}

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "bursa"
});

async function insertManeger() {
  let sqlCommand;
  let data =  await readAndCreate("JSON");
  console.log("data:", data);
  console.log("data.length:", data.length);
  for (let i = 0; i < data.length; i++) {
    sqlCommand = `INSERT INTO stokes (id, stoke_name, Quantity, stoke_price, stoke_available, is_exist) 
    VALUES ( ${data[i].id}, '${data[i].name}', ${data[i].Quantity}, 
    ${data[i].price}, ${data[i].free_stoks}, ${data[i].is_exist})`
    con.query(sqlCommand, function (err, result) {
        if (err) console.log(err);
    });
  }
}
// insertManeger()



module.exports = app;
