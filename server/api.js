const express = require('express')
const router = express.Router()
const moviesData = require('./moviesData.js')

router.get('/get', function(req, res) {
    res.end("GET API is working.")
})
router.post('/add', function(req, res) {
    res.end("POST API is working. " + req.body.name)
})
router.put('/edit', function(req, res) {
    res.end("PUT API is working. " + req.body.name)
})
router.delete('/delete/:name', function(req, res) {
    res.end("DELETE API is working. " + req.params.name)
})

//----Get all movies----//
router.get('/get/movies', function(req, res, report) {
    moviesData.find().then(eachOne => {
        res.json(eachOne)
    }).catch(err => {
        res.json(err.message)
    })
})
//----Get all name of movies----//
router.get('/get/moviesName', function(req, res, report) {
    moviesData.find({}, 'name').then( moviesName => {
        res.json(moviesName)
    }).catch(err => {
        res.json(err.message)
    })
})
//----Add a movie----//
router.post('/post/movies', function(req, res, report) {
    moviesData.create(req.body).then(function(movies) {
        res.send(movies)
    }).catch(report)
})
//----Update movies data----//
router.put('/update/movies/:id', function(req, res, report) {
    moviesData.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        moviesData.findOne({_id: req.params.id}).then(function(movies) {
            res.send(movies)
        }).catch(report)
    }).catch(report)
})
//----Delete a movie data----//
router.delete('/delete/movies/:id', function(req, res, report) {
    moviesData.findByIdAndRemove({_id: req.params.id}).then(function(movies) {
        res.send(movies)
    }).catch(report)
})

//----Sorting----//
//----Order by movies name(ASC)----//
router.get('/get/ASCName', function(req, res, report) {
    moviesData.find().sort( { name: 1 } ).then(function(movies) {
        res.send(movies)
    }).catch(report)
})
//----Order by movies name(DESC)----//
router.get('/get/DESCName', function(req, res, report) {
    moviesData.find().sort( { name: -1 } ).then(function(movies) {
        res.send(movies)
    }).catch(report)
})
//----Order by movies price(ASC)----//
router.get('/get/ASCPrice', function(req, res, report) {
    moviesData.find().sort( { price: 1 } ).then(function(movies) {
        res.send(movies)
    }).catch(report)
})
//----Order by movies price(DESC)----//
router.get('/get/DESCPrice', function(req, res, report) {
    moviesData.find().sort( { price: -1 } ).then(function(movies) {
        res.send(movies)
    }).catch(report)
})

module.exports = router