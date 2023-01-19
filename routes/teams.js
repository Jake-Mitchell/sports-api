const express = require('express')
const router = express.Router()
const Teams = require('../models/teams')
const { getAllTeams, getTeam, createTeam } = require('../controllers/teams')

// Get all
router.get('/', getAllTeams)

// Get one
router.get('/:id', getTeam)

// Create one
router.post('/', createTeam)

// Update one
// router.patch('/:id', updateTeam)

// Delete one
// router.delete('/:id', deleteTeam)

// Seed database
// router.post('/', seedWithTeams)

module.exports = router