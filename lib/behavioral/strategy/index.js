const debug = require('debug')('all:strategy-pattern:index');
const ConfigReader = require('./configReader/ConfigReader');

const jsonConfig = new ConfigReader('json', './configFiles/config.json');

debug('JSON Strategy output');
debug(jsonConfig.get('a'));
debug(jsonConfig.set('c', '3'));
jsonConfig.save();

const yamlConfig = new ConfigReader('yaml', './configFiles/config.yaml');

debug('YAML Strategy output');
debug(yamlConfig.get('a'));
debug(yamlConfig.set('c', 3));
debug(yamlConfig.get('c'));
yamlConfig.save();