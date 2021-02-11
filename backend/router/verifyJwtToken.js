const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/config.js');
const userModel = mongoose.model("users");

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
    req.userId = decoded.id;
    next();
  });
}

isAdmin = (req,res,next) => {
  userModel.findOne({_id: req.userId}, (err,user) => {
    if (user){
      if (user.role.toUpperCase() === "ADMIN"){
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