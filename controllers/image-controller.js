const responseHelper = require('../helpers/responseHelper');
const con = require('../db/connection-mysql');
require('dotenv').config();
const download = require('image-downloader')


class ImageController {

  async saveimage(req, res) {
      console.log(req.body);
    let imageUrl = req.body.url;
    let name = req.body.name;
    let id = req.body.id;
   let options = {
      url: imageUrl,
      dest: './public/images/mob/'+name+'.jpg'      // will be saved to /path/to/dest/photo.jpg
    }
    console.log(options.dest); 
    download.image(options)
      .then(({ filename }) => {
          if (filename){
            const saveiMage_SQL = "call updatedeviceimage('" + req.body.id + "','" + name+'.jpg' + "')"
            console.log(saveiMage_SQL);
            try{
             con.query(saveiMage_SQL, function (err, result) {
               if (result) {
                 responseHelper.get(res, 'user list', result[0])
               } else {
                 responseHelper.get(res, 'user list', [])
               }
             })
            }catch(e){
             return responseHelper.onError(res, 'Error', 'Something Went Wrong.Please Try Again');
            }
            // res.status(200).json({mobilebrands:"Image saved Successfully"})

          }
    })
      .catch((err) => console.error(err))
  } 
}




module.exports = ImageController