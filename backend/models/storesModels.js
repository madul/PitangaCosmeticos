module.exports = function(){

  this.getStores = function (connection, callback){
    connection.query("select * from stores", callback);
  }

  return this;
}