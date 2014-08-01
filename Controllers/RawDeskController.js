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
            //new DMXHandler().sendValue(cues[data.cue],data.value,self.serialPort);
        });

        socket.on('set',function(data){
            console.log('set received ...');
            //new DMXHandler().sendValue(data.data,master,self.serialPort);
        });
    });
    self.ctx.res.render(faderView,this.ctx);
}


module.exports = RawDeskController;