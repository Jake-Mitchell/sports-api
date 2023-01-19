const mongoose = require('mongoose')

const teamsSchema = new mongoose.Schema({
    mascot: {
        type: String,
        required: true,
    },
    school: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('teams', teamsSchema)