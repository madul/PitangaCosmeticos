var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/config.js');
const connection = require('../config/database');
const userModel = require('../models/usersModels');
const clientModel = require('../models/clientsModels');

exports.signup = (req,res) => {

  console.log("Processing SignUp");

  userModel.createUser({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,8),
    role: req.body.role
  }, 
  connection()(),
  (err,user) => {
    if(user){
      res.send("User registered succesfully!");
    } else {
      res.status(500).send("Fail! Error -> " + err);
    }
  });
}

exports.signin = (req,res,next) => {
  console.log("Sign-In");
  /* console.log("HEADER: ", req.header, " BODY: ",req.body); */
  userModel.getUserByEmail(req.body.email, connection()(), (err, user) => {
    console.log(req.body.email)
    console.log("USER: ",user)
    console.log("ERROR:", err)
    if(!(user.length >0)) {
      return res.status(404).send({error: "User not found."});
    }
     console.log("USER CONTROLLER 37: ", user.length) 
    var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);

    if(!passwordIsValid){
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!"});
    }
    /* console.log("JWT.SIGN: ", user ) */
    var token = jwt.sign({ id: user[0].userID }, config.secret, {
      expiresIn: 86400 //expires in 24 hours  
    });

    res.status(200).send({auth:true, accessToken: token});
    
    if(err){
      res.status(500).send({erro: "Error -> " + err})
    }
  });

  
}

exports.userContent = (req,res) =>{
  //console.log("REQ BODY, USERCONTENT: ", req.userId)
  userModel.getUserById(req.userId, connection()(), (err,user) => {
    if(user){
     // console.log("USER: ",user)

      if(user[0].role.toUpperCase() === "CLIENT"){
        clientModel.getClientByEmail(user[0].email,connection()(), (err,client) =>{
          console.log(client)
          console.log(err)
          if(client){
            console.log(client)
            res.status(200).json({
              "description": "User Content Page",
              "client": client[0]
            });
          }
          else{
            res.status(404).json({
              "description": "Client not found",
              "error": err
            });
          }
        })
        
      } else {
        res.status(500).json({
          "description": "Can not access User Page",
          "error": err
        });
      }
    }
    else if(err){
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    }
  });
}

exports.adminBoard = (req,res) =>{
  userModel.getUserById(req.userId, connection()(), (err,user) => {
    if(user){
      if(user[0].role.toUpperCase() === "ADMIN"){
        res.status(200).json({
          "description": "Admin Board",
          "user": user[0]
        });
      } else {
        res.status(500).json({
          "description": "Can not access Admin Board",
          "error":err
        });  
      }
    }
    if(err){
      res.status(500).json({
        "description": "Can not access Admin Board",
        "error":err
      });
    }
  });
}
