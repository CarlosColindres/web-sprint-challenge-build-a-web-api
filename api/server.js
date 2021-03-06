const express = require('express');
const helmet = require('helmet')
const server = express();

const projectsRouter = require('./projects/projects-router')

const actionsRouter = require('./actions/actions-router')

server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
