const debug = require('debug')('LogExecTime');

function LogExecTime(component) {
  this.component = component;

  // Create a proxy for all the methods on the immediate prototype of the object provided
  const prototypeKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(component));

  for (let key of prototypeKeys) {

    if (typeof component[key] === 'function' && key !== 'constructor') {

      this[`${key}`] = () => {
        let start = process.hrtime();
        let result = component[`${key}`].call(this.component, arguments)
        let end = process.hrtime(start);

        debug(`Execution time for ${key}`)
        debug('Execution time (hr): %ds %dms', end[0], end[1] / 1000000)

        return result;
      }
    }
  }
}

module.exports = {
  LogExecTime
}