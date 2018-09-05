"use strict";
const express = require('express');
const app = express();
const Controller = require('./lib/Controller.js');
const controller = new Controller;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.post('/', function (req, res){
  var postBody = req.body;
  res.send(controller.processInput(postBody));
})


app.listen(3000);

console.log("listening on port 3000");

module.exports = app;
