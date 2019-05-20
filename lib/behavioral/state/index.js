const FailsafeSocket = require('./socket-wrapper/FailsafeSocket');
const debug = require('debug')('all:state-pattern:index');

const safeSocket = new FailsafeSocket({ PORT: 5050 });

setInterval(() => {
  safeSocket.send(JSON.stringify(process.memoryUsage(), null, '  '), () => {
    debug('Process memory consumption data written to safeSocket');
  });
}, 1000)