/**
 * Created by dietn on 01.08.14.
 */
var DMXHandler = require('../modules/DMXHandler.js');

/*views*/
var faderView = '../views/raw_desk.ejs';

//DMX variables
var master = 255;
var cues = ['','','','','','','','','','']; //cues is a list of values strings (for now)

function RawDeskController(ctx,socket,serialPort){
    //RawDeskController.prototype = Object.create(Controller.prototype);
    this.ctx = ctx;
    this.socket = socket
    this.serialPort = serialPort;
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
                cues[data.cue] = data.data;
                console.log(cues);
            }
        });

        socket.on('fade',function(data){
            console.log(data);
            if(parseInt(data.cue) === -1){
                master = parseInt(data.value);
                updateValues(self.serialPort);
            }else{
                //todo: use updateCue so that the master fader has an effect ...
                new DMXHandler().sendValue(cues[data.cue],data.value,self.serialPort);
                //updateCue(data.cue,data.value,function(){
                // new DMXHandler().sendValue(cues[data.cue],master,self.serialPort);
                // });
            }
        });

        socket.on('set',function(data){
            console.log('set received ...');
            new DMXHandler().sendValue(data.data,master,self.serialPort);
        });
    });
    self.ctx.res.render(faderView,this.ctx);
}

RawDeskController.updateValues = function(){
    var handler = new DMXHandler();
    for(var i = 0; i < cues.length; i++){
        handler.sendValue(cues[i],master,this.serialPort);
    }
}

RawDeskController.updateCue = function(index,value,callback){
    var cue = cues[index];
    if(typeof cue !== undefined) {
        var splitted = cue.split(',');
        var toUpdate = '';
        for (var i = 0; i < splitted.length; i++) {
            var curCue = splitted[i].split('@');
            toUpdate = curCue[0] + '@' + Math.round((parseInt(curCue[1]) * (value / 255)));
        }
        cues[i] = toUpdate;
        console.log(toUpdate);
        console.log(cues[i]);
        callback();
    }
}


module.exports = RawDeskController;