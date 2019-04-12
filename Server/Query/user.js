const db = require("../db");

function addUser(user) {
  return new Promise((resolve, reject) => {

   db.any('SELECT * FROM "user" WHERE name = $1', [user.username])
    .then(function(data) {
        if(data.length > 0){
            resolve({success: false, type: 'username'})
        }else{
            console.log('not here')
            db.one(

                'INSERT INTO "user"(name, password, firstname, lastname, email) VALUES($1, $2, $3, $4, $5) RETURNING *',
                [user.username, user.password, user.email, user.first, user.last]
              )
                .then(data => {
                    resolve(data)
                  console.log(data);
                })
                .catch(er => {
                    resolve({success: false, type: 'unknown'})
                  console.log(er);
                });
        }
        // success;
    })
    .catch(function(error) {
        resolve({success: false, type: 'unknown'})
    });
    
  });
}



module.exports = {
  addUser
};

