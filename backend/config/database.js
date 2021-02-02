const mysql = require('mysql');

var connMySQL = function(){
  console.log("Conexao com banco de dados estabelecida");

  return connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'pitangacos'
  });
}

module.exports = function(){
  return connMySQL;
}