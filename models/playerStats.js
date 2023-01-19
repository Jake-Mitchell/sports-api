const mongoose = require('mongoose')

const playerStatsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    battingAverage: {
        type: Number,
        required: false,
    },
    gameId: {
        type: mongoose.ObjectId, 
        required: true, 
    },
    playerId: {
        type: mongoose.ObjectId,
        required: true, 
    },
    atBats: {
        type: Number,
        required: false,
    },
    runs: {
        type: Number,
        required: false,
    },
    plateAppearances: {
        type: Number,
        required: false,
    },
    runsBattedIn: {
        type: Number,
        required: false,
    },
    doubles: {
        type: Number,
        required: false,
    },
    triples: {
        type: Number,
        required: false,
    },
    homeruns: {
        type: Number,
        required: false,
    },
})

module.exports = mongoose.model('playerStats', playerStatsSchema)