const mongoose = require("mongoose");
const config = require('config');
const dbgr = require("debug")("development:mongoose");
/* 
Run this on the terminal to set the debug value
export DEBUG=development:* 
*/

mongoose
  .connect(`${config.get("MONGODB_URI")}/Ecommerce-App`)
  .then(function () {
    console.log("connected");
    dbgr("connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
