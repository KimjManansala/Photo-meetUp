const express = require("express");
const router = express.Router();
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
module.exports = router;
const saltRounds = 10;
const userQue = require("../Query/user");

router.post("/api/reg", (req, res) => {
    
  let user = req.body;
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
            res.send(data)
        })
        .catch(er=>{
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
});


