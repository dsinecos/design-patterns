const tcp = require('net');
const debug = require('debug')('all:state-pattern:offline-state');

class OfflineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.prevDelay = -1;
    this.currentDelay = 0;
  }

  send(data) {
    // Add data to queue
    let { failsafeSocket } = this;
    debug('Queueing data in-memory');
    failsafeSocket.queue.push(data);
  }

  activate(err) {

    // Check and update FailsafeSocket state
    // this.failsafeSocket.currentState = this.failsafeSocket.states['offline'];

    // const retry = this.activate.bind(this);
    const retry = () => {
      this.currentDelay = this.prevDelay + 1;
      this.prevDelay =  this.currentDelay;

      setTimeout(this.activate.bind(this), this.currentDelay*1000)
    }


    if (err) {
      debug('Error connecting to server');
      debug(err);
    }
    debug('Initiating connection to server ');

    // Try to connect to the Server
    this.failsafeSocket.socket = tcp.createConnection({ port: this.failsafeSocket.options.PORT }, () => {
      // On success activate 'Online' state
      this.failsafeSocket.socket.removeListener('error', retry)
      debug('Connected to server successfully');
      this.prevDelay = -1;
      this.currentDelay = 0;
      this.failsafeSocket.changeState('online');
    });

    // On failure retry to connect to the server
    this.failsafeSocket.socket.once('error', retry);
  }
}

module.exports = OfflineState;