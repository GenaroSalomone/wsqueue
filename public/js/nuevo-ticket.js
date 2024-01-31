
//Referencias HTML
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCrear = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');
  btnCrear.disabled = false;
});

socket.on('last-ticket', (last) => {
  text = 'Ticket ' + last;
  console.log(text);
  lblNewTicket.innerText = text;
});


socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');
  btnCrear.disabled = true;
});


btnCrear.addEventListener('click', () => {

  socket.emit('next-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });

});