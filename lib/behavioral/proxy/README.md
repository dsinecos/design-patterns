### Contents
- [Objective](#objective)
- [Run Code](#run-code)
- [What I learnt?](#what-i-learnt)
  - [Use cases for Proxy pattern](#use-cases-for-proxy-pattern)
  - [Techniques to implement Proxies](#techniques-to-implement-proxies)
  - [Object Methods and their use case](#object-methods-and-their-use-case)
- [TODO](#todo)
- [References](#references)

## Objective

Build a wrapper that logs the execution time for the methods

## Run Code

`node index.js`

Returns the execution time for the different function calls

## What I learnt?

### Use cases for Proxy pattern

1. Data Validation

2. Security

3. Caching

4. Lazy initialization

5. Logging

6. Interacting with Remote Objects

### Techniques to implement Proxies

The proxy pattern involves wrapping actual instances of the subject, thus preserving its state. It is important to note that the proxy pattern covered here is not concerned with wrapping classes.

1. Object Composition

   To implement a proxy using composition, we have to intercept methods that we are interested in manipulating while simply delegating the rest of them to the subject

   If we want to create a proxy that delegates most of its methods, it would be convenient to generate these automatically using a library such as `delegates`

2. Object Augmentation

   Involves modifying the subject directly by replacing a method with its proxied implementation

### Object Methods and their use case

Iterating over the properties of an object (including properties on the Prototype object which are non-enumerable) using the following two methods

1. `Object.getPrototypeOf()` Returns the prototype of an object

2. `Object.getOwnPropertyNames()` Returns an array comprising of all the properties for the object (including non-enumerable) 

## TODO

1. <s>Create a wrapper that returns the execution time for a wrapped synchronous method</s>

2. Create a proxy for all the methods in the Prototype chain stopping when the prototypal chain encounters base object `{}`

3. Wrap Asynchronous methods using Proxy Pattern (Methods using a callback or promises or async-await pattern)

## References

1. [NodeJS Design Patterns by Mario Casciaro](https://www.amazon.in/Node-js-Design-Patterns-Mario-Casciaro/dp/1785885588)
