const AuthControllers = require('./auth-controller');
const auth = new AuthControllers();
const UserController = require('./user-controller');
const users = new UserController();
const DevicesController = require('./devices-controller');
const devices = new DevicesController();
const ThirdPartyIntegrationController = require('./third-party-controller');
const third = new ThirdPartyIntegrationController();
const MobileController = require('./mobile-controller');
const mobile = new MobileController();
const ImageController = require('./image-controller');
const image = new ImageController();
module.exports = { users , auth, devices, third, mobile , image}
