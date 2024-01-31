
const path = require('path');
const fs = require("fs");

/**
 * Class representing a ticket.
 */
class Ticket {
  /**
   * Create a ticket.
   * @param {number} numero - The number of the ticket.
   * @param {string} desk - The desk assigned to the ticket.
   */
  constructor(numero, desk) {
    this.numero = numero;
    this.desk = desk;
  }
}

/**
 * Class for controlling tickets.
 */
class TicketControl {
  /**
   * Create a ticket controller.
   */
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];
    this.init();
  }

  /**
   * Get the JSON representation of the ticket controller.
   * @return {Object} The JSON representation of the ticket controller.
   */
  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    }
  }

  /**
   * Initialize the ticket controller.
   */
  init() {
    const { today, tickets, lastFour, last } = require("../db/data.json");
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFour = lastFour;
    } else {
      this.saveDB()
    }
  }

  /**
   * Save the state of the ticket controller to the database.
   */
  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  /**
   * Get the next ticket.
   * @return {string} The number of the next ticket.
   */
  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveDB();
    return 'Ticket ' + ticket.numero;
  }

  /**
   * Handle a ticket.
   * @param {string} desk - The desk handling the ticket.
   * @return {Ticket} The ticket being handled.
   */
  handleTicket(desk) {
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();
    ticket.desk = desk;

    this.lastFour.unshift(ticket);

    if (this.lastFour.length > 4) {
      //Cut last
      this.lastFour.splice(-1, 1);
    }

    this.saveDB();
    return ticket;
  }
}


module.exports = TicketControl;