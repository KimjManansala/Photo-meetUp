const express = require("express");
const router = express.Router();
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const AWS = require('aws-sdk');
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
module.exports = router;
const saltRounds = 10;
const userQue = require("../Query/user");


//configuring the AWS environment
// AWS.config.update({
//     accessKeyId: "<Access Key Here>",
//     secretAccessKey: "<Secret Access Key Here>"
//   });

//   var s3 = new AWS.S3();

router.post("/api/reg", (req, res) => {
  let user = req.body.user;
  if (validator.validate(user.email)) {
    bcrypt
      .hash(user.password, saltRounds)
      .then(pass => {
        userQue.addUser({
          username: user.username,
          password: pass,
          email: user.email,
          first: user.first,
          last: user.last
        })
        .then(data=>{
          req.session.user = data.user

            res.send(data)
        })
        .catch(er=>{
            console.log(er)
            res.send(er)
        })
      })
      .catch(er => {
        res.send({ success: false, type: "password" });
      });
  } else {
    res.send({ success: false, type: "email" });
  }
});

router.get("/api/log", (req, res) => {
  let user = req.query.user;
  let password = req.query.password
  userQue.loginUser({username: user, password: password})
  .then(data=>{
    req.session.user = data.user
    console.log(req.session)      
    res.send(data)

  })
  .catch(er=>{
      res.send(er)
  })
});


router.post('/api/user/img', (req,res)=>{
    console.log(req.body)
})