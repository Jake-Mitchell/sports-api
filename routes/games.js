const express = require('express')
const router = express.Router()
const {
    createGame,
    deleteGame,
    getGame,
    getGames,
    updateGame,
} = require('../controllers/games')

// Create one
router.post('/', createGame)

// Get one
router.get('/:id', getGame)

// Get many
router.get('/', getGames)

// Delete one
router.delete('/:id', deleteGame)

// Update one
router.patch('/:id', updateGame)

module.exports = router