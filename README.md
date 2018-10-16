### Index
- [Tools and purpose](#tools-and-purpose)
- [Setup](#setup)
    - [For Development Environment](#for-development-environment)
    - [Run tests](#run-tests)
- [Debug configuration](#debug-configuration)
    - [Dockerfile.dev](#dockerfiledev)
    - [launch.json](#launchjson)


## Tools and purpose

| Tool | Objective |
| -- | -- |
| VSCode | Editor |
| VSCode | Debugging Client |
| Git (CLI) <br> GitKraken (GUI) | Version control |
| Yarn | Dependency management |
| Docker | Containerization |
| ESLint | Code Linting |
| JSDoc | Documentation |
| | |
| Testing |  |
| Mocha | Test runner |
| Chai | Assertion library |
| Sinon | For mocking and stubbing |
| | |
| Nodemon | Auto-restarting app |
| Debug | Logging during development |
| Dotenv | Setup environment variables|

## Setup

### For Development Environment

1. Build Image
   
   `docker build -f Dockerfile.dev -t dsinecos/node-project-boilerplate .`

2. Run container
   
   `docker run -it -v /usr/app/node_modules -v $(pwd):/usr/app --name=node-project-boilerplate dsinecos/node-project-boilerplate`

3. Run container in debug mode (Refer [Debug configuration](#debug-configuration))
   
   `docker run -it -v /usr/app/node_modules -v $(pwd):/usr/app -p 9229:9229 --name=node-project-boilerplate dsinecos/node-project-boilerplate`


4. Run a shell process inside the container
   - Open another terminal
   - `docker exec -it node-project-boilerplate sh`

### Run tests

1. Run a shell process inside the container
   - Open another terminal
   - `docker exec -it node-project-boilerplate yarn run tests`

## Debug configuration
(For more instructions refer [Debugging with VSCode](https://dsinecos.github.io/blog/Debugging-with-VSCode))

### Dockerfile.dev

1. Startup command - `CMD ["./node_modules/nodemon/bin/nodemon.js", "--inspect=0.0.0.0:9229", "index.js"]`

   Startup command has to be modified to start the application in debug mode

   `--inspect=host:port` 
   - `host` has to be `0.0.0.0` to allow applications outside the container (VSCode) to connect with the debugging socket
  
   - `port` The default value for the port is 9229 but can be changed. Whichever port is chosen for listening to debug commands has to be exposed outside the container using `-p` flag in `docker run` command

### launch.json

**Configuration - Launch Chrome**

1. Port on which the application is served 
```json
{
    "url": "http://localhost:3000",
}
```

2. Directory serving static files for the application (Path on local machine and not inside container). `${workspaceFolder}` represents the currently open folder in VSCode
```json
{
    "webRoot": "${workspaceFolder}/public",
}
```

**Configuration - Docker: Attach to Node**

1. Port on which the node application is listening for debug commands (default is 9229). This is the port on the local machine to which the container port is exposed.
```json
{
    "port": 9229,
}
```

2. Re-attach the VSCode client to the node application when it restarts (from nodemon restarting on code changes)
```json
{
    "restart": true,
}
```

3. Specify the path for the project on the container
```json
{
    "remoteRoot": "/usr/app",
}
```