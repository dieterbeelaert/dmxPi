/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
var express = require('express');
var server = new express();
var DMXHandler = require("./modules/DMXHandler.js");
var handler = new DMXHandler();
var Context = require('./models/Context.js');
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json())
//serve static files
server.use("/public", express.static(__dirname + '/public'));
server.listen(8080);


server.get("/",function(req,res){
   res.render('../views/index.ejs');
});

server.get("/console",function(req,res){
   res.render('../views/console.ejs');
});

server.post('/console/cmd',function(req,res){
    var ctx = new Context(req);
    //channel, value
    console.log(ctx);
    new DMXHandler().sendValue(ctx.getParam('channel'),ctx.getParam('value'));
    res.end();
});


