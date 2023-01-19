const express = require('express')
const router = express.Router()
const {
    checkForInvalidTeamFields,
    createTeam,
    deleteTeam,
    getAllTeams,
    getTeam,
    seedDatabaseWithTeams,
    updateTeam,
} = require('../controllers/teams')

// Get all
router.get('/', getAllTeams)

// Get one
router.get('/:id', getTeam)

// Create one
router.post('/', checkForInvalidTeamFields, createTeam)

// Update one
router.patch('/:id', checkForInvalidTeamFields, updateTeam)

// Delete one
router.delete('/:id', deleteTeam)

// Seed data
router.post('/seed', seedDatabaseWithTeams)

module.exports = router