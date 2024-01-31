
//Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');



const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error("Desk is required");
}

const desk = searchParams.get('escritorio');
lblEscritorio.innerText = desk;

console.log({ escritorio: desk });


const socket = io();

socket.on('connect', () => {
  btnAtender.disabled = false;
});

socket.on('last-ticket', (last) => {
  // text = 'Ticket ' + last;
  // console.log(text);
  // lblNewTicket.innerText = text;
});


socket.on('disconnect', () => {
  btnAtender.disabled = true;
});


btnAtender.addEventListener('click', () => {

  // socket.emit('next-ticket', null, (ticket) => {
  //   lblNewTicket.innerText = ticket;
  // });

});