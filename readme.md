## Introduction

A sample REST API for serving mockup athlete information for Olympic Channel development and QA tests.

## Running the application.

In order to run the application first execute

```
npm install
```

then compile the typescript into javascript by

```
npm run build
```

and finally start the server

```
npm run start
```

Server will be run at http://localhost:3000. Try navigating to http://localhost:3000/athletes/1

## Back-end tests

### Installation and Execution

Install newman via npm on your system globally. Remove the -g flag if you want locally.

```
npm install -g newman
````

You can also install globally via brew.

```
brew install newman
```

### Test Execution

The test collection is inside tests/backend dir.

```
newman run tests/backend/smoke-collection.json -e tests/backend/local-env.json
```

The environment variables are mandatory for successful execution. Please provide the "-e" argument

Note:Not a good idea to commit environment files into a repository. For the sake of simplicity and 
avoid unattended failures, its placed in the tests/backend directory.
Tested using a Mac Big Sur 11.6.
