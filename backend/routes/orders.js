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

    let keys = Object.keys(req.body);
    let items = [];
    let price = [];

    const ordem = () =>{queryO.insertOrder(user,connection,(err,result) =>{
      if(err){
        if(newClient){
          queryC.deleteClient(userId, connection);
        }        
       status_ = false;  
       message = "Ordem não pode ser inserida. \n Tente novamente mais tarde" ;
       res.send({status: status_, message: message})
      } 
      else{
        orderId = result.insertId;
        /** insert soldItems */
    
        items.forEach(item => {
          item.orderId = orderId;
          querySI.insertSoldItem(item, connection, (err,result) =>{
            if(err) {
             querySI.deleteSoldItemByOrderId(item.orderId, connection);
             queryO.deleteOrder(item.orderId, connection);
              if(newClient){
                console.log("NEW CLIENT: ",newClient)
                queryC.deleteClient(userId, connection);
              }
              status_ = false;
              message = "Desculpa, não temos esse item em estoque. \n Por favor, tente mais tarde. Em breve reporemos o estoque."
    
              res.send({status: status_, message: message})
              
            }
            else{
              if(status_){
                message = "Pedido realizado com sucesso!";
                if(newClient){
                  message += '\n Usuário criado! \n Senha: fruta123'
                }
              }
              res.send({status: status_, message: message})
            }
          })
        })
      }
    })}
    
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
      "password": 'fruta123',
      "cpf": req.body.cpf,
      'zipCode': req.body.zipCode,
      'uf': req.body.uf,
      'city': req.body.city,
      'address': req.body.logradouro + '- ' + req.body['address-number']
    }
    
    if (!req.body.clientId){
      queryC.insertClient(user, connection, (err,result) =>{
        if(err){
         // res.send({error: err});
         status_ = false; 
         message = "Erro no cadastro. \n Por favor, tente mais tarde.";
         
        res.send({status: status_, message: message}) 
        console.log("ERRO USER: ", err);
        }
        userId = result.insertId;
        user['clientId'] = userId
        newClient = true;
        ordem()
      })
    }

    user['clientId'] = userId
    
    console.log("ID USER: ",!user['clientId'])
    /** insert Order */
    
    if(user['clientId']) {
      console.log("ENTROU NO IF"); 
      ordem()
    }
    
    
  })
}