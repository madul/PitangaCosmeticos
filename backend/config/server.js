const express = require('express');
const consign = require('consign');
const cors = require("cors");
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')


var app = express();
app.set('view engine', 'ejs');
app.set('views', '././views')

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

/* require('./src/models/User')
const User = mongoose.model("users")
 */
consign()
.then('./models')
.include('././routes')

.then('./config/database.js') 
.then('./config/mongodb.js')

.into(app)

module.exports = app;