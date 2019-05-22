const debug = require('debug')('all:strategy-pattern:strategies');
const YAML = require('yaml');

module.exports.jsonStrategy = {
  serialize(data) {
    return JSON.stringify(data);
  },

  deserialize(data) {
    return JSON.parse(data);
  }
};

module.exports.yamlStrategy = {
  serialize(data) {
    return YAML.stringify(data);
  },

  deserialize(data) {
    return YAML.parse(data);
  }
};