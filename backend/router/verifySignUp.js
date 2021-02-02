const config = require('../config/config.js');
const ROLEs = config.ROLEs;
const userModel = require('../models/usersModels');
const connection = require('../config/database');

checkDuplicateEmail = (req, res, next) => {
  //console.log("USER MODEL: ",userModel);
  //console.log("CONNECTION DUPLICATE: ", connection()());
 
  userModel.getUserByEmail(req.body.email, connection()(), user => { 
    console.log("USER: ", user);
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
