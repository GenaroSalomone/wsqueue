
const path = require('path');
const fs = require("fs");


class TicketControl {

  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour
    }
  }

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

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json');
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }

}

module.exports = TicketControl;