const tcp = require('net');
const debug = require('debug')('all:state-pattern:online-state');

class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {
    // Write data to socket
    let { socket } = this.failsafeSocket;
    socket.write(data.toString(), () => {
      debug('Process memory consumption data written to socket');
    })
  }

  activate() {

    // Check and update FailsafeSocket state
    // this.failsafeSocket.currentState = this.failsafeSocket.states['online'];

    // Add Event Listener to change state when socket returns error
    this.failsafeSocket.socket.once('error', this.failsafeSocket.changeState.bind(this.failsafeSocket, 'offline'));

    // Check queue for pending data
    while (this.failsafeSocket.queue.length) {
      // Send pending data
      this.send(this.failsafeSocket.queue.shift());
    }

  }
}

module.exports = OnlineState;