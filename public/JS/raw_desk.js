/**
 * Created by Dieter Beelaert on 17/07/2014.
 */

var socket = io();
var recordMode = false;

//programmer is angular
function raw_deskCtrl($scope,$http){
    $scope.command = ''; 
    $scope.recordMode = false;

    $scope.sendCommand = function(){
        console.log("keyup");
        //check if the values in the field are valid and send them to the server
         socket.emit('set',{data: $scope.command});
    }

    $scope.recordCue = function(){
        //ask user which cue ...
        //send to server over sockets what needs to be recored in what cue
	$scope.recordMode = true;
	recordMode = true;
    }
}

//faders are jquery ...
$(document).ready(function(){

    socket.emit('set',{data:'test'});
    $('.fader').slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 255,
        value: 0,
        slide: function( event, ui ) {
	    var cue = $(this).attr('number');
	    if(recordMode){
                 //get value by ui.value
                 socket.emit('fade',{cue:cue,value:ui.value});
	    }else{
		console.log('recording: ' + $("#txtCmd").val());
console.log("at cue: " + cue);
	         socket.emit('record',{cue:cue,data: $('#txtCmd').val()});
	         $('#txtCmd').val('');
	         recordMode = false;
            }
    }});
});
