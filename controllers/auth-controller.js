const db = require('../db/db');
const responseHelper = require('../helpers/responseHelper');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');
const config = require('config');
const Users = db.models.users;
const expiry = config.jwtTokenExpiry

require('dotenv').config();
class AuthControllers {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return responseHelper.unauthorized(res, 'Please Enter email and password');
      }
      const user = await Users.findOne({
        attributes: ['id', 'email', 'role','name',  'password'],
        where: {
          email: email,
        }
      });

      if (user) {
        const getUser = user.toJSON();
        const match = await hashPassword.comparePass(password, getUser.password);

        // compare pwd
        if (!match) {
          return responseHelper.post(res, 'Error', 'Invalid Password');
        }

        const credentials = {
          id: getUser.id,
          email: getUser.email
        };

        const token = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: expiry });

        getUser.token = token;
        delete getUser.password;
        delete getUser.email;
        delete getUser.roleId;
        return responseHelper.post(res, 'Login successfully', getUser);
      }

      return responseHelper.post(res, 'Invalid User', 'Invalid User');
    } catch (e) {
      console.log('Error => ', e);
      return responseHelper.post(res, 'Error', e);
    }
  }
  async addUser(req, res) {
    const data = req.body;
    try {
      req.checkBody('email', 'email is required').notEmpty();
      req.checkBody('email', 'valid email is required').isEmail();
      req.checkBody('password', 'password is required').notEmpty();
      const error = req.validationErrors();
      if (error) {
        responseHelper.onError(res, '', error[0].msg);
        return;
      }
      const user = await Users.findOne({
        where: {
          email: data.email
        }
      });
      if (!user) {
        const pswd = await hashPassword.generatePass(data.password);
        data.password = pswd;
        data.role = "USER"
        console.log(data);
         const users = await Users.create(data);
        if (users) {
          const userId = users.dataValues.id;
          data.userId = userId;
          const credentials = {
            id: userId,
            email: users.dataValues.email
          };
          const userdetails = {};
          userdetails.email = users.dataValues.email;
          userdetails.name = users.dataValues.name ; 
          userdetails.id = userId;
          return responseHelper.post(res,userdetails, "User Added Successfully!");
        }
      } else {
        responseHelper.post(res, '', 'User already exists');
      }
    } catch (e) {
      return responseHelper.onError(res, e, 'Error while creating a user');
    }
  }
}

module.exports = AuthControllers