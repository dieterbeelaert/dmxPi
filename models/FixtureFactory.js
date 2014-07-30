/**
 * Created by dietn on 30.07.14.
 */
var Fixture = require('./Fixture.js');
var fixtures = require('../FixtureLibrary/Fixtures.json');

function FixtureFactory(){

}


/*creates fixture from json*/
FixtureFactory.prototype.createFromJSON = function(address,json,SerialPort){
    var toReturn = new Fixture(json.name,address,SerialPort);
    toReturn.values = json.values;
    toReturn.isMovingHead = json.isMovingHead;
}

/*Get a list of fixturenames*/
FixtureFactory.prototype.getFixtureList = function(){
    console.log(fixtures.fixtures);
    var toReturn = [];
    for(var i = 0; i < fixtures.fixtures.length; i++){
        toReturn.push(fixtures.fixtures[i].name);
    }
    return toReturn;
}

module.exports = FixtureFactory;


//example json//
//fixture = {name:mac250,isMovingHead:true,values{pan:0,tilt:0,dimmer:0,shutter:0,...}}

//fixture = {name:genericLed,isMovingHead:false,values{red:0,green:0,blue:0}}