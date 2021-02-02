module.exports = function(){

  this.insertSoldItem = function (item, connection, callback){
    connection.query(`insert into soldItems (productID, valueItem, quantity, orderID)
    values(${item.productId}, ${item.price}, ${item.quantity}, ${item.orderId})`, callback);
  }

  this.deleteSoldItemByOrderId = (id, connection, callback) =>{
    connection.query(`delete from soldItems where orderID = ${id}`)
  }
  
  return this;
}