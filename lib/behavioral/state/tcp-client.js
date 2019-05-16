const tcp = require('net');
const debug = require('debug')('all:state-pattern:client');

const PORT = 5050;

const client = tcp.createConnection({ port: PORT }, () => {
  debug('Connected to Server!');
});

client.on('end', () => {
  debug('Disconnected from server');
});

setInterval(() => {
  client.write(JSON.stringify(process.memoryUsage(), null, '  '), () => {
    debug('Process memory consumption data written to server');
  });
}, 2000)
