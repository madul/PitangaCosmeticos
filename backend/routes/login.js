const verifySignUp = require('../router/verifySignUp');
const authJwt = require('../router/verifyJwtToken');

module.exports = function(app){
  const controller = require('../controller/controller');

  app.post('/signup', [verifySignUp.checkDuplicateEmail], controller.signup)
  
  app.post('/login', controller.signin);

  app.get('/user',[authJwt.verifyToken], controller.userContent);
  app.get('/admin',[authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}



/* module.exports = function(app){
  var multer  = require('multer')
  var upload = multer()
  
  app.post('/login', upload.none(), function(req,res){
    let connection = app.config.database();
    let query = app.models.usersModels;
    
    console.log("BODY:",req.body);

    res.send(req.body)
   /*  query.getUsers(connection, function(err,results, fields){
      console.log(err);
      res.send({users: results})
    }); *
  });
}  */