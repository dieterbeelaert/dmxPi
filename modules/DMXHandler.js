/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
//var SerialPort = require('serialport').SerialPort;



function DMXHandler(serialport){
    this.serialPort = serialport;
}

module.exports = DMXHandler;

DMXHandler.prototype.sendValue = function(channel,value){
    console.log('called to write to serialport serialport isopen: ' + this.isOpen);
    if(this.isOpen) {
     this.serialPort.write(channel + 'c' + value + 'w');
    }
}

