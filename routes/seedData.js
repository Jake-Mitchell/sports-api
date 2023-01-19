const express = require('express')
const router = express.Router()
const { seedDatabaseWithTeams } = require('../controllers/teams')
const { seedDatabaseWithPlayers } = require('../controllers/players')
const { seedDatabaseWithGames } = require('../controllers/games')
const { seedDatabaseWithPlayerStats } = require('../controllers/playerStats')

// seed database
router.post(
    '/', 
    seedDatabaseWithTeams, 
    seedDatabaseWithPlayers, 
    seedDatabaseWithGames,
    seedDatabaseWithPlayerStats,
)

module.exports = router