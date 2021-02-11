module.exports = function(){

  this.getOrdersByClientId = function (id, connection, callback){
    connection.query(`select * from orders where clientID = '${id}'`, callback);
  }
  
  this.insertOrder = function (user, connection, callback){
    connection.query(`insert into orders (clientID, address, city, state, zipCode) 
    values('${user._id}', '${user.address}', '${user.city}','${user.state}','${user.zipCode}')`, callback)
  }

  this.deleteOrder = (id, connection, callback) =>{
    connection.query(`delete from orders where orderID = ${id}`)
  }

  return this;
}