const express = require('express')
const router = express.Router()
const PlayerStats = require('../models/playerStats')
const {
    checkForInvalidFields
    createPlayerStats,
    deletePlayerStats,
    getAllPlayerStats,
    getPlayerStats,
    seedDatabaseWithPlayerStats,
    updatePlayerStats,
} = require('../controllers/playerStats')

// Get all
router.get('/', getAllPlayerStats)

// Get one
router.get('/:id', getPlayerStats)

// Create one
router.post('/', checkForInvalidFields, createPlayerStats)

// Update one
router.patch('/:id', checkForInvalidFields, updatePlayerStats)

// Delete one
router.delete('/:id', deletePlayerStats)

// Seed data
// router.post('/seed', seedDatabaseWithPlayerStats)

module.exports = router