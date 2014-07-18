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
                if(!recordMode){
                    //get value by ui.value
                    socket.emit('fade',{cue:cue,value:ui.value});
                }else{
                    console.log('recording: ' );
                    console.log("at cue: " + cue);
                    socket.emit('record',{cue:cue,data:$('#txtCommand').val()});
                    recordMode = false;
                    $('#txtCommand').val('');
                    $('#msgRecordMode').hide();
                }
            }
        });

        $('#btnRecordCue').click(function(){
           recordMode = true;
            $('#msgRecordMode').show();

        });

        $('#txtCommand').keyup(function(){
            socket.emit('set',{data: $('#txtCommand').val()});
        });

        $('#btnRecordStep').click(function(){

        });
    });


