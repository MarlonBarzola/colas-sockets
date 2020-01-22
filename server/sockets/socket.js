const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //
    // ─── AVANZAR TICKET ─────────────────────────────────────────────────────────────
    //

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);

        callback(siguiente);

    });

    //
    // ─── VER EL ESTADO ACTUAL DEL TICKET ────────────────────────────────────────────
    //

    //Emitir un evento 'estadoActual'
    let estadoActual = { 
        actual: ticketControl.getUltimoTicket() ,
        ultimos4: ticketControl.getUltimos4()
    };
    
    client.emit('estadoActual', estadoActual);

    //
    // ─── ASIGNAR TICKET A UN ORDENADOR ──────────────────────────────────────────────
    //

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Actualizar / notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', estadoActual);

    });
    
});