const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const userModel = require('../models/usersModels');
const connection = require('../config/database');

verifyToken = (req, res, next) =>{
  let token = req.headers['x-access-token'];
  
  if(!token){
    return res.status(403).send({
      auth: false, message: 'No token provided.'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err){
      return res.status(500).send({
        auth: false,
        message: 'Fail to Authentication. Error -> ' + err
      });
    }
    /* console.log("ACESS DECODED: ", decoded) */
    req.userId = decoded.id;
    next();
  });
}

isAdmin = (req,res,next) => {
  userModel.getUserById(req.userId, connection()(), (err,user) => {
    /* console.log("ID", req.userId)
    console.log(user); */
    if (user){

      if (user[0].role.toUpperCase() === "ADMIN"){
        
        next();
        return;
      } else {
        res.status(403).send("Require Admin Role!");
        return;
      }
    } else {
      res.status(403).send("Require Admin Role!");
      return;
    }
  });
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;

module.exports = authJwt;