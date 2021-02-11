const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Client = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  cpf: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  }
},
{
  timestamps: true
})

mongoose.model('clients', Client)