const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var multer = require('multer');
var upload = multer();
const bearerToken = require('express-bearer-token');
const http = require('https').createServer(app);
const expressValidator = require('express-validator');
const port = process.env.PORT || 4000;
const passport = require('passport');

// const appRoutes = require('./router/appRoutes')
const checkConn = require('./helpers/checkConn');
var cors = require('cors');

app.use(expressValidator());
app.use(bearerToken());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
upload.array('files[]')
app.use(express.static('public'));
// Passport
app.use(passport.initialize());
require('./passport')(passport);
app.use(cors())
// contain user routes
const routes = require('./routers/user/routes');
app.use('/api/v1/user', routes);
// contain admin routes
const adminroutes = require('./routers/admin/routes');
app.use('/api/v1/admin', adminroutes);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});
const healthCheck = async () => {
  await checkConn.checkDbConnection();
};

app.listen(port, async () => {
  await healthCheck();
  console.log(`Listening on port ${port}`);
});
