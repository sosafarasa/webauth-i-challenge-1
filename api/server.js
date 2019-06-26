const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

// const db = require('../database/dbConfig');
// const Users = require('../users/users-model');

const sessionConfig = {
    name: 'jaguar',
    secret: 'Not really a jaguar, just a cat',
    cookie: {
        maxAge: 1000 * 15,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.get('/', (req, res) => {
  res.send(`<h1>Hey there, it's working!</h1>`);
});

module.exports = server;