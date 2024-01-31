const TicketControl = require("../models/tickets-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

        //TODO: notificar nuevo ticket pendiente de asignar
    })

    socket.on('handle-ticket', ({ desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.handleTicket(desk);

        //TODO: Notificar cambio en los ultimos 4
        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })

}



module.exports = {
    socketController
}

