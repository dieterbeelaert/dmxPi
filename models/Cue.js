/**
 * Created by dietn on 30.07.14.
 */
var DMXHandler = require('../modules/DMXHandler.js');

function Cue(values,serialPort){
    this.values = values;
    this.serialPort = serialPort;
    this.steps = [];
    this.isChase = false;
    this.isChaseRunning = false;
    this.chaseSpeed = 500;
    this.currentStep = 0;
    this.value = 0;
}

Cue.prototype.setChaseSpeed = function(speed){
    this.chaseSpeed = speed;
}

Cue.prototype.addStep = function(values){
    this.isChase = true;
    if(this.steps.length === 0){
        this.steps.push(this.values);
    }
    this.steps.push(values);
}

Cue.prototype.nextStep = function(){
    if(this.isChaseRunning){
        new DMXHandler().sendValue(values[this.currentStep],this.value,this.serialPort);
        this.currentStep = (this.currentStep +1) % this.steps.length;
        setTimeout(this.nextStep,this.chaseSpeed);
    }
}

Cue.prototype.startChase = function(){
    this.isChaseRunning = true;
    this.nextStep();

}

Cue.prototype.stopChase = function(){
    this.isChaseRunning = false;
}

Cue.prototype.updateValue = function(val){
    var oldVal = this.value;
    this.value = val;
    if(this.isChase){
        if(oldVal === 0 && this.value > 0){
            this.startChase();
        }else if(this.value === 0){
            this.stopChase();
        }
    }else{
        new DMXHandler().sendValue(this.values,this.value,this.serialPort);
    }
}

module.exports = Cue;


