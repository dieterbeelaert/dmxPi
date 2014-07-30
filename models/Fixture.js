/**
 * Created by dietn on 30.07.14.
 */

//todo add fixture number
function Fixture(name,address,SerialPort){
    this.SerialPort = SerialPort;//needed to send values to serialPort
    this.address = address;
    this.values = {};
}


Fixture.update = function(){
    var i = 0;
    var toSend = '';
    for(var q in this.values){
        toSend += (this.address + i)+'c' + this.values[q] + 'w';
    }
    this.SerialPort.write(toSend);

}
module.exports = Fixture;