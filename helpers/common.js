const config = require('config');
const jwt = require('jsonwebtoken');

const deJson = require('jwt-decode')
// to get the user id from token 
const userId = (token) => {
    const decoded = jwt.verify(token, config.jwtToken);
    return decoded.id;
}
const email = (token) => {
  //  console.log(token,"token")
    const decoded = deJson(token);
    //console.log(decode,"decode");return
    return decoded;
}
//  for random String 
const generateRandomString = (length = 10) => {
    return Math.random().toString(36).substr(0,length);
}
// to get time stamp
const timestamp = () => {
  /*   return time = Math.floor(Date.now()/1000) */
    return time = Math.round(new Date().getTime() / 1000)
}

// function randomString(len, an){
    const TypeLengthRandon = (len=10, an ='A') => {
    an = an&&an.toLowerCase();
    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
    for(;i++<len;){
      var r = Math.random()*(max-min)+min <<0;
      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
    }
    return str;
}
module.exports = {
    userId,
    generateRandomString,
    timestamp,
    email,
    TypeLengthRandon
}