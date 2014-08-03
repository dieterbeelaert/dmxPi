/**
 * Created by dietn on 01.08.14.
 */
var DMXHandler = require('../modules/DMXHandler.js');
var Cue = require('../models/Cue.js');

/*views*/
var faderView = '../views/raw_desk.ejs';

//DMX variables
var master = 255;
var numberOfCues = 10;
var cues = []; //cues is a list of values strings (for now)
var firstTime = true;

function RawDeskController(ctx,socket,serialPort){
    //RawDeskController.prototype = Object.create(Controller.prototype);
    this.ctx = ctx;
    this.socket = socket
    this.serialPort = serialPort;
    if(firstTime) {
        this.clearCues();
        firstTime = false;
    }
}

RawDeskController.prototype.doRequest = function(){
    var self = this;
    console.log('doRequest');
    /*Socket listeners*/
    self.socket.on('connection',function(socket){
        console.log('socket connection');

        socket.on('record',function(data){
            //data.cue, data.data
            console.log('on record: ' + data);
            if(data.cue != -1){
                /*cues[data.cue] = data.data;
                console.log(cues);*/
                cues[data.cue] = new Cue(data.data,self.serialPort);
            }
        });

        socket.on('fade',function(data){
            //new DMXHandler().sendValue(cues[data.cue].values,data.value,self.serialPort);
            if(cues[data.cue] !== undefined) {
                cues[data.cue].updateValue(data.value);
            }
        });

        socket.on('set',function(data){
            new DMXHandler().sendValue(data.data,master,self.serialPort);
        });

        socket.on('recordStep',function(data){
            var cueNumber = data.cue;
            if(cues[cueNumber] !== undefined){
                cues[cueNumber].addStep(data.data);
            }
        });

        socket.on('blackout',function(){
           for(var i = 0; i < cues.length; i++){
               if(cues[i] !== undefined){
                   cues[i].updateValue(0);
               }
           }
        });

        socket.on('tap',function(data){

        });
    });
    self.ctx.res.render(faderView,this.ctx);
}

RawDeskController.prototype.clearCues = function(){
    for(var i = 0; i < numberOfCues; i++){
       cues[i] = undefined;
    }
}


module.exports = RawDeskController;