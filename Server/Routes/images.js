const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

var multer = require('multer')
var multerS3 = require('multer-s3')

const userProfile = require('../Query/userProfile')

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
module.exports = router;

AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: 'us-east-1'
  });

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();


// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
      Body: buffer,
      Bucket: process.env.S3BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };


router.post('/api/profile/image', (request, response) => {
  console.log('RUNNNING IMAGES')
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `userProfile/${request.session.user.name}/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          console.log('This is data', data)
          const results = await userProfile.updateUserData(data, request.session.user, {phone: '443',  about: 'Text'})
          console.log(results)
          return response.status(200).send(results);
        } catch (error) {
            console.log('this is error', error)
          return response.status(400).send(error);
        }
      });
  });


  router.post('/api/portfolio/images', (req, res)=>{
    let user = req.session.user
    const form = new multiparty.Form();

    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
        try{      
          console.log('hello', fields.user[0])
          console.log(files)
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `${user.name}/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          console.log('This is data', data)
          return res.status(200).send(data);
        } catch (error) {
            console.log('this is error', error)
          return res.status(400).send(error);
        }
  })
})


router.delete('/api/remove/images', (req, res)=>{
  let data = userProfile.deleteImg(req.data.imgKey)
  console.log(data)

})