var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
var cors = require('cors')
var mongoose = require('mongoose');

//routers
var authRouter = require('./src/routes/auth');
var doctorRouter = require("./src/routes/doctor");
var patientRouter = require("./src/routes/patient");
var adminRouter = require("./src/routes/admin");
var reportRouter = require("./src/routes/report");
var fileRouter = require("./src/routes/file");
var appointmentRouter = require('./src/routes/appointment');
var dietPlanRouter = require("./src/routes/dietPlan");
var mammogramRouter = require("./src/routes/mammogram");
var feedbackRouter = require('./src/routes/feedback');
var prescriptionRouter = require('./src/routes/prescription');


var app = express();

require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("Database: MongoDB Connected"))
  .catch(err => console.log(err));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors()
);

/*
{
    origin: [
      'https://localhost:19006',
      'https://192.168.31.218:19000',
      `${process.env.FRONT_URL}`,
      'http://localhost:3001',
      'http://192.168.100.12:3002',
      'http://192.168.100.12:3001',
      'http://localhost:3002/'
      
    ],
    credentials: false
  }
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/


app.use('/api/accounts',authRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/patient',patientRouter);
app.use('/api/admin',adminRouter);
app.use('/api/report',reportRouter);
app.use('/api/appointment',appointmentRouter);
app.use('/api/dietplan',dietPlanRouter);

app.use('/api/prescription',prescriptionRouter);

app.use('/api/feedback',feedbackRouter);

//mammogram
app.use('/api/mammogram',mammogramRouter);

app.use('/file',fileRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
