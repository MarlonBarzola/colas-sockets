var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').html('Escritorio ' + escritorio);

$('button').on('click', function(){

    socket.emit('atenderTicket', { escritorio: escritorio }, function(response){

        if(response == 'No hay tickets') {

            alert(response);
            label.html(response);   
            return; 

        }

        label.html(response.numero);        

    });

});