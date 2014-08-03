/**
 * Created by Dieter Beelaert on 16/07/2014.
 */
//var SerialPort = require('serialport').SerialPort;



function DMXHandler(){
}

module.exports = DMXHandler;


DMXHandler.prototype.sendValue = function(valueString,master,serialPort){
if(valueString !== undefined){
  var values = valueString.split(',');
    for(var i = 0; i < values.length; i++){
        if(values[i] !== '' || values[i].indexOf('@') !== -1){
            var splitted = values[i].split('@');
            var val = Math.round(parseInt(splitted[1]) *(master/255));
            var toSend = splitted[0] + 'c' + val + 'w';
            serialPort.write(toSend);
        }
    }
}
}


