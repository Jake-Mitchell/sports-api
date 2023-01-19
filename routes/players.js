const express = require('express')
const router = express.Router()
const {
    createPlayer,
    deletePlayer,
    getPlayer,
    getPlayers,
    updatePlayer,
} = require('../controllers/players')

// Create one
router.post('/', createPlayer)

// Get one
router.get('/:id', getPlayer)

// Get many
router.get('/', getPlayers)

// Delete one
router.delete('/:id', deletePlayer)

// Update one
router.patch('/:id', updatePlayer)

// Seed data
// router.post('/seed', seedDatabaseWithPlayers)

module.exports = router