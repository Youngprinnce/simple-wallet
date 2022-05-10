class Transaction {
  constructor(data) {
    this.id = data.id;
    this.sender = data.sender;
    this.receiver = data.receiver;
    this.amount = data.amount;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

module.exports = Transaction;
