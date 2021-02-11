var multer  = require('multer')
var upload = multer()
const mongoose = require('mongoose')
const userModel = mongoose.model("users");
const clientModel = mongoose.model("clients");
const controller = require('../controller/controller');
var bcrypt = require('bcryptjs');

module.exports = function(app){

  app.get('/myOrders', function(req,res){
    let connection = app.config.database();
    let query = app.models.productsModels;

  
    query.getProductsByOrdersByClientId(req.headers.id,connection, function(err,results,fields){
  
      res.send({orders: results})
    }); 
  });

  app.post('/place-order', upload.none(), async function(req, res){
    let connection = app.config.database();
    let queryO = app.models.ordersModels;
    let querySI = app.models.soldItemsModels;

    let userId = req.body.clientId;
    let orderId = 0;
    let isNewClient = false;
    let message = ""
    let status_ = true;

    let keys = Object.keys(req.body);
    let items = [];
    let price = [];

    const ordem = (user,isNewClient) =>{
     
      queryO.insertOrder(user,connection, async(err,result) =>{
      if(err){
    
        if(isNewClient){
          clientModel.findOneAndDelete({email: user.email})
          userModel.findOneAndDelete({email: user.email})
          //queryC.deleteClient(userId, connection);
        }        
        status_ = false;  
        message = "Ordem não pode ser inserida. \n Tente novamente mais tarde" ;
    
        res.send({status: status_, message: message})
      } 
      else{
        orderId = result.insertId;
        /** insert soldItems */
    
       const itemsReg = function () {
          items.forEach(item => {
          item.orderId = orderId;
      
          querySI.insertSoldItem(item, connection, (err,result) =>{
            if(err) {
             querySI.deleteSoldItemByOrderId(item.orderId, connection);
             queryO.deleteOrder(item.orderId, connection);
              if(isNewClient){
        
                clientModel.findOneAndDelete({email: user.email})
                userModel.findOneAndDelete({email: user.email})
                //queryC.deleteClient(userId, connection);
              }
              status_ = false;
              message = "Desculpa, não temos esse item em estoque. \n Por favor, tente mais tarde. Em breve reporemos o estoque."
    
              res.send({status: status_, message: message}) 
            }
          })
        })
        return true
      }
        const aux = await itemsReg()
       
        if(aux){
         
          if(status_){
            message = "Pedido realizado com sucesso!";
            if(isNewClient){
              message += '\n Usuário criado! \n Senha: fruta123'
            }
            res.send({status: status_, message: message})
          }
        }
      }
    })}
    
    keys.forEach(key =>{
      if(key.match(/^price-/)){
        price.push( {id: key.split("-")[1], price: req.body[key]})
      }
    })
  
    keys.forEach(key =>{

      if(key.match(/^product-/)){
    
        let id = key.split("-")[1]
        let quantity = req.body[key]

    

        items.push({
          'productId':  id, 
          'price': price.filter(p => p.id == id)[0].price, 
          'quantity': quantity
        })
      }
    })

    /* cria usuário se pessoa não é cadastrada ainda */
    let user = {
      "name" : req.body.name,
      "surname" : req.body.surname,
      "email": req.body.email,
      "password": 'fruta123',
      "cpf": req.body.cpf,
      'zipCode': req.body.zipCode,
      'state': req.body.state,
      'city': req.body.city,
      'address': req.body.address + ' - ' + req.body['address-number']
    }
    
    if (!req.body.clientId){
      const validate = await userModel.findOne({email: req.body.email})
      if (validate){
        return res.json({message: "Email already being used. Please, choose another one."})
      }
      else{
        const newUser = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync("fruta123",8)
        });

        const newClient = new clientModel({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          cpf: req.body.cpf,
          address: req.body.address + ' - ' + req.body['address-number'],
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode
        })
        

        newClient.save(function(err, user) {
          if (err) {
        
              res.send({status: false,message:'Falha no registro do Cliente'});
          }
          else{
            newUser.save(async function(err, userNew) {
              if (err) {
              
                  const user = await clientModel.findOneAndDelete({_id: newClient.id})
                  res.send({status: false,message:'Falha no registro do Usuário'});
              }
               else{
                //res.send({status: true,message:"User registered succesfully!"});
                //user['clientId'] = newClient._id
            
            
                isNewClient = true;
                ordem(user, isNewClient)
              } 
            })
          }
        }) 
      }
    }

    user['_id'] = userId
    
  
  
    
    /** insert Order */
    if(user['_id']) {
    
      ordem(user)
    }
    
    
  })
}