const express = require('express')
const router = express.Router()
const Teams = require('../models/teams')
const {
    checkForInvalidTeamFields,
    createTeam,
    getAllTeams,
    getTeam,
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
// router.delete('/:id', deleteTeam)

// Seed database
// router.post('/', seedWithTeams)

module.exports = router