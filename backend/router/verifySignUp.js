const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const connection = require('../config/database');
const mongoose = require('mongoose');
const userModel = mongoose.model("users");

checkDuplicateEmail = (req, res, next) => {
  userModel.findOne({email: req.body.email}, user => { 
    if(user){
      res.status(400).send("Fail -> Email is already in use!");
      return;
    }
    next();
  });
}

const signUpVerify = {};

signUpVerify.checkDuplicateEmail = checkDuplicateEmail;

module.exports = signUpVerify
