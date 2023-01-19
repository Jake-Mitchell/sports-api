const mongoose = require('mongoose')

const playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    teamId: {
        type: mongoose.ObjectId,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('players', playersSchema)