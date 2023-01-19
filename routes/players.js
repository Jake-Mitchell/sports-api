const express = require('express')
const router = express.Router()
const {
    createPlayer,
    deletePlayer,
    getPlayer,
    getPlayers,
    updatePlayer,
} = require('../controllers/players')
const { getPlayerSeasonTotals } = require('../controllers/playerStats')

// Create one
router.post('/', createPlayer)

// Get one
router.get('/:id', getPlayer, getPlayerSeasonTotals)

// Get many
router.get('/', getPlayers)

// Delete one
router.delete('/:id', deletePlayer)

// Update one
router.patch('/:id', updatePlayer)

module.exports = router