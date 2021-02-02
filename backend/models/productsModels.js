module.exports = function(){

  this.getProducts = function (connection, callback){
    connection.query("select * from products", callback);
  }
  
  this.getProductsByOrdersByClientId = function (id, connection, callback){
    connection.query(`select products.name, products.imageURL, solditems.valueItem, solditems.orderID from solditems inner join products on products.productID = solditems.productID inner join orders on orders.orderID = solditems.orderID where orders.clientID = ${id};`, callback)
  }
  return this;
}