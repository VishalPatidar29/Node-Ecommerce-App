const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require('../utils/generateToken');
 
module.exports.registerUser =   async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({email : email});
    if(user) return res.status(401).send("User Already Have Account. Please Login !");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, passwordhash) {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            email,
            passwordhash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user Created Successfully !");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}