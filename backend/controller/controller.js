var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/config.js');
const connection = require('../config/database');
const mongoose = require('mongoose')
const userModel = mongoose.model("users");
const clientModel = mongoose.model("clients");

exports.signup = async (req,res) => {

  console.log("Processing SignUp");
  
  const validate = await userModel.findOne({email: req.body.email})
  if (validate){
    return res.json({message: "Email already being used. Please, choose another one."})
  }
  else{
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,8)
    });

    const newClient = new clientModel({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      cpf: req.body.cpf,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode
    })

    newClient.save(function(err, user) {
      if (err) {
          console.log(err);
          res.send({status: false,message:'Falha no registro do Cliente'});
      }
      else{
        newUser.save(async function(err, user) {
          if (err) {
              console.log(err);
              const user = await clientModel.findOneAndDelete({_id: newClient.id})
              res.send({status: false,message:'Falha no registro do Usuário'});
          }
          else{
            res.send({status: true,message:"User registered succesfully!"});
          }
        })
      }
    })
    
    
  }
}

exports.signin = (req,res,next) => {
  console.log("Sign-In");
  userModel.findOne({email: req.body.email}, (err, user) => {  
    if(!(user)) {
      return res.status(404).send({error: "User not found."});
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if(!passwordIsValid){
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!"});
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 //expires in 24 hours  
    });

    res.status(200).send({auth:true, accessToken: token});
    
    if(err){
      res.status(500).send({erro: "Error -> " + err})
    }
  });

  
}

exports.userContent = (req,res) =>{
  //userModel.getUserById(req.userId, connection()(), (err,user) => {
  userModel.findOne({_id: req.userId},  (err,user) => {
    if(user){
      if(user.role.toUpperCase() === "CLIENT"){
        clientModel.findOne({email: user.email}, (err,client) =>{
          if(client){
            res.status(200).json({
              "description": "User Content Page",
              "client": client
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
