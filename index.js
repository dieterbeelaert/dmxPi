/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
var express = require('express');
var server = new express();
var SerialPort = require('serialport').SerialPort;
var DMXHandler = require("./modules/DMXHandler.js");
var Context = require('./models/Context.js');
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json())
//serve static files
server.use("/public", express.static(__dirname + '/public'));


var serialPort = new SerialPort('/dev/ttyACM0',{ baudrate: 9600,dataBits: 8,parity: 'none',stopBits: 1,flowControl: false});
serialPort.on("open", function () {
    console.log('serial port is open');
    var handler = new DMXHandler(serialPort);
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

});









