module.exports = function(){

  this.getRole = function (userID, connection, callback){
    connection.query(`select * from roles where userID = ${userID}`, callback);
  }

  return this;
}