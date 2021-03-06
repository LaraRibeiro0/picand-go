const database = require("../utils/database");
var User = require("../models/user");

module.exports = (req, res, next) => {
   const db = database.connect();

   var user = new User(req.user);

   // selecionar utilizador atual da sessão
   var sql = "SELECT accepted, deleted FROM Users WHERE id = ?";
   var params = user.id;
   db.get(sql, params, async function (err, row) {
      if (err)
         return res.status(500).json({ "message": "Oh! " + err.message });

      if (row) {
         var error = checkRow(row);
         if (error.value)
            return res.status(400).json({ "message": error.message });

         next();
      }
      else
         return res.status(400).json({
            "message": "Ups! O utilizador atual já não existe."
         });
   });

   db.close();
};


function checkRow(row) {
   if (row.deleted == 1)
      return { "value": true, "message": "Ups! O utilizador atual já não existe." }
   if (row.accepted == 0)
      return { "value": true, "message": "Ups! O utilizador atual não está ativado." }

   return { "value": false };
}