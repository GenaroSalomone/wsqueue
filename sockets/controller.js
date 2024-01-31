const TicketControl = require("../models/tickets-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);

        //TODO: notificar nuevo ticket pendiente de asignar
    })

}



module.exports = {
    socketController
}

