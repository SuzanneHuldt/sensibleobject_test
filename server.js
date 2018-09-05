"use strict";
const express = require('express');
const app = express();
const Controller = require('./lib/Controller.js');
const controller = new Controller;
const bodyParser = require('body');
const jsonParser = require('body/json');


app.post('/', function (req, res){
  var bodyjson = jsonParser(req);
  res.send(controller.processInput(request.bodyjson));
})


app.listen(3000);

console.log("listening on port 3000");
