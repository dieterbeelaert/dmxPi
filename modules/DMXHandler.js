/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
var SerialPort = require('serialport').SerialPort;



function DMXHandler(){
    this.serialPort = null;
    this.isOpen = false;
    //serialPort = new SerialPort('/dev/ttyACM0',{ baudrate: 9600,dataBits: 8,parity: 'none',stopBits: 1,flowControl: false});
    //serialPort.on("open", function () {console.log('serial port is open');isOpen = true;} );
}

module.exports = DMXHandler;

DMXHandler.prototype.sendValue = function(channel,value){
    console.log('called to write to serialport serialport isopen: ' + this.isOpen);
    if(this.isOpen) {
        console.log('writing to serial port');
        serialPort.write(channel + 'c' + value + 'w');
    }
}

