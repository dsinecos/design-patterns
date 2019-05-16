const tcp = require('net');
const debug = require('debug')('all:state-pattern:server');

const PORT = 5050;
const server = tcp.createServer(tcpConnectionHandler);

function tcpConnectionHandler(connection) {
  debug('Client Connection Received');
  // debug(connection);
  setupListeners(connection);
}

function setupListeners(connection) {
  connection.on('close', () => {
    debug('Client connection closed');
  })

  connection.on('data', (data) => {
    debug('Data received from client');
    debug(data.toString());
  })
}

server.listen(PORT, () => {
  debug('Server listening on PORT ', PORT);
})