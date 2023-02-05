var express = require('express');
var compress = require('compression');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 7800;
var server = require('http').createServer(app);
var session = require('express-session');
var cookieParser = require('cookie-parser');
const helmet = require("helmet");

const corsOptions = {
    orign: '*',
    methods: "GET,POST,OPTIONS",
    credentials: true,
    allowedHeaders: [
        "Content-Type","Authorization","X-Requested-With",
        "device-remember-token","Access-Control-Allow-Origin","Origin"
    ],
    preflightContinue: true,
    optionsSuccessStatus: 200
}
app.use(helmet.hidePoweredBy());
app.use(cors(corsOptions));
//app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "ThisisStudentRegistrationSystem"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compress());
app.set('view engine', 'ejs');
app.use('/', require('./controllers'));
app.use(function errorHandler(
  err,
  req,
  res,
  next
) {

  if (err) {
      const errorBody = {
          message: err.message,
          data: null,
          status: err.name,
      };
      return res.status(500).json(errorBody);
  }
  next();
});
server.listen(port, function() {
  console.log('Listening on port ' + port);
});
