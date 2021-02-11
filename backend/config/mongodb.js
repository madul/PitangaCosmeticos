const mongoose = require('mongoose')

function connect() {
  mongoose
    .connect('mongodb://localhost:27017/pitangacos', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true })
    .then(() => {
      console.log("Conectado com o Banco PitangaCos Mongo")
    })
    .catch((err) => {
      console.log("Erro: ", err)
    });
}

module.exports = connect();