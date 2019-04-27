const db = require("../db");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  region: "us-east-1"
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const deleteImg = imgKey => {
  var params = {
    Bucket: process.env.S3BUCKET,
    Key: imgKey
  };
  s3.deleteObject(params, function(err, data) {
    if (err) return { success: false };
    // an error occurred
    else return { success: true };
    /*
         data = {
         }
         */
  });
};

function updateUserData(data, user, input) {
  return new Promise((resolve, reject) => {
    db.any(`SELECT * FROM "user-data" WHERE user_id=${user.id}`)
      .then(res => {
        console.log("This is res", res, res.length);
        if (res.length === 0) {
          console.log(data.Location, data.key, input.phone, input.about);
          db.one(
            'INSERT INTO "user-data"(img, imgkey, phone, about, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [data.Location, data.key, input.phone, input.about, user.id]
          )
            .then(resolve)
            .catch(reject);
        } else {
          console.log(res);
          deleteImg(res[0].imgkey);
          console.log("IN THE ELSE");
          console.log("------");
          db.one(
            'UPDATE "user-data" SET img = $1, imgkey = $2 WHERE user_id= $3 RETURNING *',
            [data.Location, data.key, user.id]
          )
            .then(data => {
              resolve(data);
            })
            .catch(er => {
              console.log(er);
            });
        }
      })
      .catch(reject);
  });
}

module.exports = {
  updateUserData,
  deleteImg
};
