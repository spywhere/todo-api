# To Do API

## Remarks
For simplicity purpose, the following points are assumed...

- A connection to another system are made as simple as possible, that is no connection handling, no error handling built-in for connection
- Error due to invalid request structure / format are not being handled
- An operation performed on the unexisting item will be silently discarded
- Time limit are taken as `from <= now < to`

## Setup

### Recommended
The easiest and fastest way to get the application up and running is by using Docker.
Make sure Docker and Docker Compose has been installed on your computer, then
run the following command...

```
$ docker-compose up
```

Application will start on port 3000 with MongoDB running on port 27017

### Manual Setup
To get the application running, you would need to install the following software...

- Node.js (with `npm`)
- MongoDB

Before running the application, you would need to install all the dependencies by
running the following command in the project directory...

```
$ npm install
```

To run the application, simply run...

```
$ npm start
```

Application will start on port 3000 by default with connection to MongoDB on port 27017

## Documentations

- `developers/architecture.md` Application Architecture
- `developers/specifications.md` API Specifications
