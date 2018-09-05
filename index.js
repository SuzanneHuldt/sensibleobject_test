"use strict";
const express = require("express");
const app = express();
const Controller = require('./Controller.js');
const controller = new Controller;

app.use(express.bodyParser());

app.post('/', function (req, res){
  res.send(controller.processInput(request.body));
})


app.listen(3000)
