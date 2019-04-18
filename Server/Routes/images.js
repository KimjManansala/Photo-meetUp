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


router.post('/api/profile/photo', (request, response) => {
    console.log('iS SENDING TO /API/PROFILE/PHOOS')
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `userProfile/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          console.log('This is data', data)
          return response.status(200).send(data);
        } catch (error) {
            console.log('this is error', error)
          return response.status(400).send(error);
        }
      });
  });





// const s3 = new AWS.S3();
// // var params = {
// //     Bucket: 'kimjmanansala-photo',
// //     Body : fs.createReadStream(filePath),
// //     Key : "folder/"+Date.now()+"_"+path.basename(filePath)
// //   };


// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'kimjmanansala-photo',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null,  "folder/"+Date.now()+"_"+path.basename(file)); //use Date.now() for unique file keys
//         }
//     })
// });


// router.post("/api/profile/photo", upload.array('upl',1), (req, res) => {
//     res.send("Uploaded!");
// })

//   s3.upload(params, function(err, data) {
//     //handle error
//     if (err) {
//       console.log("Error", err);
//     }

//     //success
//     if (data) {
//       console.log("Uploaded in:", data.Location);
//     }
//   });

