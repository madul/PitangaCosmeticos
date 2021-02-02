var multer  = require('multer')
var upload = multer()


module.exports = function(app){

  app.get('/myOrders', function(req,res){
    let connection = app.config.database();
    let query = app.models.productsModels;

    query.getProductsByOrdersByClientId(req.headers.id,connection, function(err,results,fields){
      res.send({orders: results})
    }); 
  });

  app.post('/place-order', upload.none(), function(req, res){
    let connection = app.config.database();
    let queryC = app.models.clientsModels;
    let queryO = app.models.ordersModels;
    let querySI = app.models.soldItemsModels;

    let userId = req.body.clientId;
    let orderId = 0;
    let newClient = false;
    let message = ""
    let status_ = true;
    console.log("BODY:",req.body);

    let keys = Object.keys(req.body);
    let items = [];
    console.log(keys);
    let price = [];
    keys.forEach(key =>{
      if(key.match(/^price-/)){
        price.push( {id: key.split("-")[1], price: req.body[key]})
      }
    })
    console.log("PRICE: ", price)
    keys.forEach(key =>{

      if(key.match(/^product-/)){
        console.log(key)
        let id = key.split("-")[1]
        let quantity = req.body[key]

        console.log("ID: ", id, ' price: ', price.filter(p => p.id == id)[0].price, ' qtd: ', quantity)

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
      "cpf": req.body.cpf,
      'zipCode': req.body.zipCode,
      'uf': req.body.uf,
      'city': req.body.city,
      'address': req.body.logradouro + '- ' + req.body['address-number']
    }
    if (!req.body.clientId){
      queryC.setClient(user, connection, (err,result) =>{
        if(err){
         // res.send({error: err});
         status_ = false; 
         message = "Erro no cadastro. \n Por favor, tente mais tarde.";
         
         
        }
        userId = result.insertId;
        newClient = true;
      })
    }

    user['clientId'] = userId

    /** insert Order */
    console.log ("USER PRE ORDER: ", user)
    queryO.insertOrder(user,connection,(err,result) =>{
      if(err){
        if(newClient){
          queryC.deleteClient(userId, connection);
        }        
       // res.send({error: err});
       status_ = false;  
       message = "Ordem não pode ser inserida. \n Tente novamente mais tarde" ;
       throw err;
      } 
      else{
        orderId = result.insertId;
        /** insert soldItems */
    
        console.log("INSERTED ID: ",orderId)
        items.forEach(item => {
          item.orderId = orderId;
          console.log("ITEM: ",item)
          querySI.insertSoldItem(item, connection, (err,result) =>{
            if(err) {
              querySI.deleteSoldItemByOrderId(item.orderId, connection);
              queryO.deleteOrder(item.orderId, connection);
              if(newClient){
                queryC.deleteClient(userId, connection);
              }
              //res.send({error: err})
              status_ = false;
              console.log("ERRO.", status_)
              message = "Erro ao inserir item. \n Por favor, tente mais tarde."
              
              throw err;
            }
          })
        })
      }
    })
    if(status_){
      message = "Pedido realizado com sucesso!";
      if(newClient){
        message += '\n Usuário criado! \n Senha: fruta123'
      }
    }
    res.send({status: status_, message: message})
  })
}