var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bp = require("body-parser");
const qr = require("qrcode");
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// app.use('/users', usersRouter);
app.post("/scan", (req, res) => {
  const url = req.body.url;

  // If the input is null return "Empty Data" error
  if (url.length === 0) res.send("Empty Data!");
  
  // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
  // It shall be returned as a png image format
  // In case of an error, it will save the error inside the "err" variable and display it
  
  qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");
    
      // Let us return the QR code image as our response and set it to be the source used in the webpage
      res.render("scan.ejs", { src });
  });
});
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

module.exports = app;

// const port = 5002;
// app.listen(port, () => console.log("Server at 5000"+" http://localhost:"+port));