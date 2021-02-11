const verifySignUp = require('../router/verifySignUp');
const authJwt = require('../router/verifyJwtToken');
const mongoose = require('mongoose')
const userModel = mongoose.model("users");
const clientModel = mongoose.model("clients");
var multer  = require('multer')
var upload = multer()

module.exports = function(app){
  const controller = require('../controller/controller');

  app.post('/signup', [upload.none(),verifySignUp.checkDuplicateEmail], controller.signup)
  
  app.post('/login', controller.signin);
  app.get('/users', async(req, res)=>{
    const usersResponse = await userModel.find()
    const usersJson = await usersResponse
  
    return res.json(usersJson)
  })
  app.get('/clients', async(req, res)=>{
    const clientsResponse = await clientModel.find()
    const clientsJson = await clientsResponse
  
    return res.json(clientsJson)
  })
  app.delete('/clients/:id', async(req, res) => {
    const {id} = req.params
    const client = await clientModel.findOneAndDelete({_id: id})
  
    res.json({message: "Usuário deletado com sucesso"})
  })
  app.get('/user',[authJwt.verifyToken], controller.userContent);
  app.get('/admin',[authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}

