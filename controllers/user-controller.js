const moment = require("moment")
const db = require('../db/db');
const responseHelper = require('../helpers/responseHelper');
const hashPassword = require('../helpers/hashPassword');
const Users = db.models.users;
require('dotenv').config();
class UserController {

  async getAllUsers(req, res) {
    let _role = req.params.id;
    try {
      const user = await Users.findAll({
       
      });
      if (user) {
        responseHelper.get(res, 'user list', user)
      } else {
        responseHelper.get(res, 'user list', [])
      }
    } catch (e) {
      return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
    }
  }
  
  async deleteUser(req,res){
  try {
    const sUsers = await Users.findOne({
      attributes: ['id'],
      where: {
        id: req.params.id
      }
    });
    if(sUsers) {
   const deleteUser =  await Users.destroy({
      where: {
        id : req.params.id
      }
  })
   if(deleteUser) {
   responseHelper.del(res, 'Deleted', 'User Successfully Deleted!');
   } else {
    responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
   }
  } else {
    responseHelper.onError(res, 'Error', 'User Not Exists');
  }
   } catch (e) {
    responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
   }
  }
  async getUserbyId(req, res){
    let _userid = req.params.id;
    try {
      const user = await Users.findAll({
        // attributes: ['id', 'name', 'email', 'roleId', 'phone', 'profile_image', 'business_logo', 'location', 'business_name', 'category', 'created_at'],
        where: {
          id: _userid
        }
      });
      if (user) {
        responseHelper.get(res, 'user', user)
      } else {
        responseHelper.get(res, 'user', [])
      }
    } catch (e) {
      return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
    }
  }
  async updateUser(req, res){
    try {
      const data = req.body;
      console.log('data.id::::::::', data);
      data.name = data.name;
      if (req.file && req.file.filename){
        data.profile_image = 'images/user/'+req.file.filename;

      }
      const sUsers = await Users.findOne({
        attributes: ['id','email','name','profile_image','phone'],
        where: {
          id: req.body.id
        }
      });
      // data.updatedAt = common.timestamp();
      const catStatus = await Users.update(
        data,
        {
          where: {
            id: data.id
          }
        });


      if (catStatus) {
        responseHelper.put(res, 'Success', sUsers)
      } else {
        responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!')
      }
    } catch (e) {
      responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again!');
    }
  }
 }
 

module.exports = UserController