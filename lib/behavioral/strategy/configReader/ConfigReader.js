const _get = require('lodash.get');
const _set = require('lodash.set');
const fs = require('fs');
const debug = require('debug')('all:strategy-pattern:ConfigReader');

const jsonStrategy = require('./strategies').jsonStrategy;
const yamlStrategy = require('./strategies').yamlStrategy;

class ConfigReader {
  constructor(filetype, filename) {
    this.filetype = filetype;
    this.filename = filename;
    this.strategy = this.getStrategy(filetype);
    this.data = this.load(filename);
  }

  get(path) {
    const value = _get(this.data, path);

    if (value === 'default') {
      return null;
    }

    return value;
  }

  set(path, value) {
    return _set(this.data, path, value);
  }

  save() {
    // Serialize the data object & Save to filename
    fs.writeFileSync(this.filename, this.strategy.serialize(this.data), 'utf-8');
    debug('Data saved to file');
  }

  load() {
    // Read from file, deserialize and load into data
    return this.strategy.deserialize(fs.readFileSync(this.filename, 'utf-8'));
  }

  getStrategy(filetype) {
    switch (filetype) {
      case 'json':
        return jsonStrategy;
      case 'yaml':
        return yamlStrategy;
      default:
        return null;
    }
  }
}

module.exports = ConfigReader;