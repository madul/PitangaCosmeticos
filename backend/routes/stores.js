module.exports = function(app){

  app.get('/stores', function(req,res){
    let connection = app.config.database();
    let query = app.models.storesModels;

    query.getStores(connection, function(err,results,fields){
     
      res.send({stores: results})
    }); 
  });
}