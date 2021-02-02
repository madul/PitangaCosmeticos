module.exports = function(app){

  app.get('/products', function(req,res){
    let connection = app.config.database();
    let query = app.models.productsModels;
    query.getProducts(connection, function(err,results,fields){
     // console.log(err,results);
      res.send({products: results})
      //res.render('products/index', {products: results});
    }); 
  });
}