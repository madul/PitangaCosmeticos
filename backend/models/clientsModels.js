var bcrypt = require('bcryptjs');

  getClientById = function (id, connection, callback){
    console.log(id)
    connection.query(`select * from clients where clientID = ${id}`, callback);
  }

  getClientByEmail = function (email, connection, callback){
    //console.log("CONNECTION: ", connection);
    connection.query(`select * from clients where email = '${email}'`, callback);
  }

  insertClient = (user, connection, callback) =>{
    connection.query(`insert into clients (name, surname, cpf, email, password, address, city, state, zipCode) 
    values('${user.name}','${user.surname}','${user.cpf}','${user.email}','${bcrypt.hashSync(user.password,8)}','${user.address}','${user.city}','${user.uf}','${user.zipCode}')`, callback);
  }

  deleteClient = (id, connection, callback) =>{
    connection.query(`delete from clients where clientID = ${id}`)
  }

const clientModels = {}
clientModels.getClientById = getClientById;
clientModels.getClientByEmail = getClientByEmail;
clientModels.insertClient = insertClient;
clientModels.deleteClient = deleteClient;

module.exports = clientModels