const express = require('express')
const next = require('next')
var cors = require('cors')
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

//----db handle with mongoose----//
const mongoose = require('mongoose')
const databaseURL = 'mongodb://localhost:27017/Movies'
mongoose.connect(databaseURL)
var connection = mongoose.connection
connection.on('connected', function() {
    console.log('connected to db')
})
connection.on('disconnected', function() {
    console.log('disconnected to db')
})
connection.on('error', function(err) {
    console.log('db connection error', err)
})
process.on('SIGINT', function() {
    connection.close(function() {
        console.log('db connection closed due to process termination')
        process.exit(0)
    })
})
module.exports = connection

//----app starting handle----//
nextApp.prepare().then(() => {
    const app = express()
    
    app.use(cors())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', require('./api.js'))

    app.use(function(err, req, res, report) {
        res.status(422).send({error: err.message})
    })

    app.get('*', (req, res) => {
        return handle(req, res)
    })
    
    app.listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:${PORT}')
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})