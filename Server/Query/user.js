const db = require("../db");
const bcrypt = require("bcrypt");
function addUser(user) {
  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM "user" WHERE name = $1', [user.username])
      .then(function(data) {
        if (data.length > 0) {
          resolve({ success: false, type: "username" });
        } else {
          db.one(
            'INSERT INTO "user"(name, password, firstname, lastname, email) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [user.username, user.password, user.email, user.first, user.last]
          )
            .then(data => {
              resolve({success: true, user: data});
            })
            .catch(er => {
              reject({ success: false, type: "unknown" });
              console.log(er);
            });
        }
        // success;
      })
      .catch(function(error) {
        reject({ success: false, type: "unknown" });
      });
  });
}

function loginUser(user) {

  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM "user" WHERE name = $1', [user.username])
    .then(data=>{
        if (data.length === 1) {
            data[0]
            bcrypt.compare(user.password, data[0].password, (err, res) =>{
                if(res){
                    resolve({success: true, user: data[0]})
                }else{
                    reject({ success: false, type: "password" });
                }
            });
        } else {
          reject({ success: false, type: "username" });
        }
      }
    )
    .catch(er=>{
        reject({ success: false, type: "unknown" });
    })
  });
}
loginUser({username:'admin', password: 'admin'});

module.exports = {
  addUser,
  loginUser
};
