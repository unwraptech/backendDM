const express  = require('express');
const app = express();
   
    const user = require('../../routes/user');
    app.use('/auth', user);
    const mobiles = require('../../routes/mobiles');
    app.use('/mobiles', mobiles);
    module.exports = app;

