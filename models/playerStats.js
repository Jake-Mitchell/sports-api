const mongoose = require('mongoose')

const playerStatsSchema = new mongoose.Schema({
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
    hits: {
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