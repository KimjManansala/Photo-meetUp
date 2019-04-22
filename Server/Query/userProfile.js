const db = require("../db");

function updateUserData(data, user, input) {

  return new Promise((resolve, reject) => {
    db.any(`SELECT * FROM "user-data" WHERE id=${user.id}`)
      .then(res => {
        if (res.length < 0) {
          console.log(data.Location, data.key, input.phone, input.about);
          db.one(
            'INSERT INTO "user-data"(img, imgkey, phone, about, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [data.Location, data.key, input.phone, input.about, user.id]
          )
            .then(resolve)
            .catch(reject); 
        }else{
            
        }
      })
      .catch(reject);
  });
}

module.exports = {
  updateUserData
};
