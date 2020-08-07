const db = require('./db');

module.exports = {
  db: db.development,
  userFilePath: 'public/images/users/',
  universitiesFilePath: 'public/images/universities/',
  societiesFilePath: 'public/images/socities/',
  defaultImage: 'public/images/default/main.png',
  defaultThumb: 'public/images/default/default.png',
  eventFilePath: 'public/images/events/',
  projectFilePath: 'public/images/projects/',
  socilaaccountFilePath : 'public/images/sAccount/' ,
  jwtToken: 'magknit',
  saltRounds: 10,
  baseUrl: '',
  demoImg:'https://dummyimage.com/400x170/E9EFF4/000000&text=Image',
  email : 'magknitl@gmail.com',
  password :"magknit@1234",
   //path :'http://localhost:4200',
 //path :'http://3.13.214.27/magknit/build',
 //path :'http://35.179.98.23/magknit/build',
 path :'https://portal.magknit.co.uk',
 jwtTokenExpiry : '2h',
 fcmServerKey : "nokey"
};
