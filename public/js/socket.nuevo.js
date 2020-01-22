//
// ─── COMANDO PARA ESTABLECER LA CONEXION ────────────────────────────────────────
//

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){

    console.log('Conectado al servidor');

});

socket.on('disconnect', function(){

    console.log('Desconectado servidor');

});

socket.on('estadoActual', function(response) {
    label.html(response.actual);
});

$('button').on('click', function(){

    socket.emit('siguienteTicket', null, function(siguienteTicket){

        label.html(siguienteTicket)

    });

});