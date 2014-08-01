/**
 * Created by Dieter Beelaert on 17/07/2014.
 */

var socket = io();
var recordMode = false;

$(document).ready(function(){
         $('#msgRecordMode').hide();
        socket.emit('set',{data:'test'});
        $('.fader').slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 255,
            value: 0,
            slide: function( event, ui ) {
                var cue = $(this).attr('number');
                var value = ui.value;
                sendFadeValue(cue,value);
            }
        });


        $('#btnRecordCue').click(function(){
           recordMode = true;
            $('#msgRecordMode').show();

        });


        $('#txtCommand').keyup(function() {
            socket.emit('set', {data: $('#txtCommand').val()});
        });

        $('#txtCmd').keyup(function(){
            socket.emit('set',{data: $('#txtCmd').val()});
        });

        $('#btnRecordStep').click(function(){

        });

        $('.flashButton').mousedown(function(){
            var cue = $(this).attr('number');
            sendFadeValue(cue,255)
        });

        $('.flashButton').button();
        $('.flashButton').mouseup(function(){
           var cue = $(this).attr('number');
            sendFadeValue(cue,0);
        });


    function sendFadeValue(cue, value){
        if(!recordMode){
            //get value by ui.value
            socket.emit('fade',{cue:cue,value:value});
        }else{
            console.log('recording: ' );
            console.log("at cue: " + cue);
            socket.emit('record',{cue:cue,data:$('#txtCmd').val()});
            recordMode = false;
            $('#txtCmd').val('');
            $('#msgRecordMode').hide();
        }
    }
});


