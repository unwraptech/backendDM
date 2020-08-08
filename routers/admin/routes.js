const express  = require('express');
const app = express();
   
    const user = require('../../routes/user');
    app.use('/auth', user);
    const devices = require('../../routes/devices');
    app.use('/devices', devices);
    const integrationAPI = require('../../routes/integrations');
    app.use('/integration3VI', integrationAPI);
    const image = require('../../routes/images');
    app.use('/images', image);
    module.exports = app;

