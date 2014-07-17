/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
//var SerialPort = require('serialport').SerialPort;



function DMXHandler(){
}

module.exports = DMXHandler;

DMXHandler.prototype.sendValue = function(valueString,serialPort){
    var values = valueString.split(',');
    var toSend = '';
    for(var i = 0; i < values.length; i++){
        if(values[i] !== '' || values[i].indexOf('@') !== -1){
            var splitted = values[i].split('@');
            var toAppend = splitted[0] + 'c' + splitted[1] + 'w';
            toSend += toAppend;
        }
    }
    console.log('to Send ...' + toSend);
    serialPort.write(toSend);
}

