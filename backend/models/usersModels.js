
  getUserById = function (id, connection, callback){
    console.log(id)
    connection.query(`select * from users1 where userID = ${id}`, callback);
  }

  getUserByEmail = function (email, connection, callback){
    connection.query(`select * from users1 where email = '${email}'`, callback);
  }

  createUser = function (user, connection, callback){
    console.log("CREATE USER: ", callback)
    connection.query(`insert into users1 (email, password, role) values('${user.email}','${user.password}','${user.role}')`, callback);
  }


const userModels = {}
userModels.getUserById = getUserById;
userModels.getUserByEmail = getUserByEmail;
userModels.createUser = createUser;

module.exports = userModels