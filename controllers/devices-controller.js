const responseHelper = require('../helpers/responseHelper');
const con = require('../db/connection-mysql');
require('dotenv').config();
class UserController {

  async getdevices(req, res) {
    const searchmobile_SQL = "call getAllDevices('" + req.body.noofrecords + "','" + req.body.page + "','" + req.body.type + "','" + req.body.filter + "')"
   try{
    con.query(searchmobile_SQL, function (err, result) {
      if (result) {
        responseHelper.get(res, 'user list', result[0])
      } else {
        responseHelper.get(res, 'user list', [])
      }
    })
   }catch(e){
    return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
   }
  } 
  async getDeviceById(req, res) {
    const searchmobile_SQL = "select * from devices where id= "+req.params.id
   try{
    con.query(searchmobile_SQL, function (err, result) {
      if (result) {
        responseHelper.get(res, 'user list', result[0])
      } else {
        responseHelper.get(res, 'user list', [])
      }
    })
   }catch(e){
    return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
   }
  } 
}




module.exports = UserController