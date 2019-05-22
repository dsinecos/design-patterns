
### Contents
- [Objective](#objective)
- [Run Code](#run-code)
- [What I learnt?](#what-i-learnt)
- [TODO](#todo)
- [References](#references)

## Objective

Implement a Configuration reader that reads from different file types such as JSON and YAML. The Configuration reader provides an interface to `get` and `set` values which can then be persisted to disk.

## Run Code

`DEBUG=all:strategy-pattern:* node index.js`

1. This reads configuration parameters from `config.json` and `config.yaml` 

2. It sets and persists an additional configuration `{"c": "3"}`

## What I learnt?

The strategy pattern can be used where a functionality is to be achieved via different logic/ algorithms depending upon the context. The different strategies used adhere to an interface and can be used for the appropriate context.

In the example I've coded, both the strategies implement 

1. `serialize` Method to write out the object to the file

2. `deserialize` Method to parse out the data read from the file

## TODO

1. Read and write to files asynchronously
2. Whenever a key is set
   1. Auto-save to file
   2. Update the object in the `ConfigReader` 
3. Setup incremental updates to file on disk instead of writing the entire object each time

## References

1. [NodeJS Design Patterns by Mario Casciaro](https://www.amazon.in/Node-js-Design-Patterns-Mario-Casciaro/dp/1785885588)