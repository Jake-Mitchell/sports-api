const mongoose = require('mongoose')

const gamesSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    homeTeamId: {
        type: mongoose.ObjectId,
        required: true,
    },
    awayTeamId: {
        type: mongoose.ObjectId,
        required: true,
    },
    winningTeamId: {
        type: mongoose.ObjectId,
        required: true,
    },
    winningScore: {
        type: Number,
        required: false,
    },
    losingScore: {
        type: Number,
        required: false,
    }
})

module.exports = mongoose.model('games', gamesSchema)