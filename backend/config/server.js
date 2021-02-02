var express = require('express');
var consign = require('consign');
var cors = require("cors");



var app = express();
app.set('view engine', 'ejs');
app.set('views', '././views')

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

consign()
.include('././routes')
.then('./config/database.js') 
.then('./models')
.into(app)

module.exports = app;