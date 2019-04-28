const mongoose = require('mongoose')
const schema = mongoose.Schema

const moviesModel = new schema({
    name: { type: String, required: true },
    tagline: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    time: { type: Date }
})

module.exports = mongoose.model('movieslists', moviesModel)