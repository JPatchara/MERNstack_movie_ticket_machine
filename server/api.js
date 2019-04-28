const express = require('express')
const router = express.Router()
const moviesData = require('./moviesData.js')
const nodemailer = require('nodemailer')

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
//----Get a movie data with selection----//
router.get('/get/movie/:name', function(req, res, report) {
    moviesData.find({name: req.params.name}, req.body).then(function() {
        moviesData.findOne({name: req.params.name}).then(function(movies) {
            res.send(movies)
        }).catch(report)
    }).catch(report)
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

router.post('/email', function(req, res, next) {
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'movie.ticket.machine@gmail.com',
            pass: 'mtm123456'
        }
    })

    var mailOptions = {
        from: 'movie.ticket.machine@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using nodemailer',
        html: '<img style="width:160px;height:210px;position:relative;float:left;display:inline-block;" src="cid:movieImg" />'
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail01+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail02
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail03+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail04
            +"<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+req.body.detail05+"<br/><br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;"
            +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            +"<b>Thank you to use our service.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Enjoy your movie!!!</b>",
        attachments: [{
            filename: 'movieImg.jpg',
            path: req.body.MovieImg,
            cid: 'movieImg'
        }]
    }
          
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

module.exports = router