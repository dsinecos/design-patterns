// FailesafeSocket is a wrapper around net.Socket
// It queues the data to be sent to the server in-memory until when disconnected

const tcp = require('net');

const OnlineState = require('./OnlineState');
const OfflineState = require('./OfflineState');

class FailsafeSocket {
  constructor(options) {
    this.options = options;
    this.queue = [];
    this.socket = null;
    this.currentState = null;
    this.states = {
      online: new OnlineState(this),
      offline: new OfflineState(this)
    }
    this.changeState('offline');
  }

  send(data) {
    this.currentState.send(data);
  }

  changeState(state) {
    this.currentState = this.states[state];
    this.currentState.activate();
  }
}

module.exports = FailsafeSocket;