/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
var express = require('express');
var server = new express();
var SerialPort = require('serialport').SerialPort;
var Context = require('./models/Context.js');
var bodyParser = require('body-parser');
var io = require('socket.io');
var http = require('http');
var DMXHandler = require('./modules/DMXHandler.js');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json())
//serve static files
server.use("/public", express.static(__dirname + '/public'));

var serialPort = new SerialPort('/dev/ttyACM0',{ baudrate: 9600,dataBits: 8,parity: 'none',stopBits: 1,flowControl: false});
serialPort.on("open", function () {
    console.log('serial port is open');
    //only startup the node server when the serialport is opened ...
    initServer();
});


function initServer(){
    var httpServer = http.createServer(server);
    var socket = io.listen(httpServer);
    httpServer.listen(8080);
    server.get("/",function(req,res){
        res.render('../views/index.ejs');
    });

    /*DMX keypad*/
    server.get("/console",function(req,res){
        res.render('../views/console.ejs');
    });

    server.post('/console/cmd',function(req,res){
        var ctx = new Context(req);
        var channel = ctx.getParam('channel');
        var value = ctx.getParam('value');
        //channel, value
        console.log(ctx);
        serialPort.write(channel +'c'+value+'w');
        res.end();
    });

    /*DMX Raw desk*/
    server.get("/raw",function(req,res){
       res.render('../views/raw_desk.ejs');
    });

    /*Socket listeners*/
    socket.on('connection',function(socket){
       console.log('socket connection');

        socket.on('record',function(data){
           //data.cue, data.data
        });

        socket.on('fade',function(data){

        });

        socket.on('set',function(data){
            console.log('set received ...');
            new DMXHandler().sendValue(data.data,serialPort);
        });
    });
}









