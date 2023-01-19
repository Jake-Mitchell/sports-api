const express = require('express')
const router = express.Router()
const PlayerStats = require('../models/playerStats')

// Get all
router.get('/', async (_req, res) =>  {
    try {
        const playerStats = await PlayerStats.find()
        res.json(playerStats)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Get one
router.get('/:id', getPlayerStats, (_req, res) =>  {
    res.send(res.playerStats)
})

// Create one
router.post('/', checkForInvalidFields, async (req, res) =>  {
    const playerStats = new PlayerStats({...req.body})

    try {
        const newPlayerStatsResult = await playerStats.save()
        res.status(201).json(newPlayerStatsResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one
router.patch('/:id', getPlayerStats, checkForInvalidFields, async (req, res) =>  {
    const fieldsToUpdate = Object.keys(req.body)
    fieldsToUpdate.forEach(field => {
        res.playerStats[field] = req.body[field]
    })

    try {
        const updatedPlayerStatsResult = await res.playerStats.save()
        res.json(updatedPlayerStatsResult)
    } catch (err) {
        res.send(400).json({ message: err.message })
    }

})

// Delete one
router.delete('/:id', getPlayerStats, async (_req, res) =>  {
    try {
        await res.playerStats.remove()
        res.json({ message: "Deleted player stats"})
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})

async function getPlayerStats(req, res, next) {
    let playerStats
    try {
        playerStats = await PlayerStats.findById(req.params.id)
        if (playerStats == null) {
            return res.status(400).json({ message: "Cannot find player stats"})
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.playerStats = playerStats
    next()
}

async function checkForInvalidFields(req, _res, next) {
    const fieldsToUpdate = Object.keys(req.body)
    const validSchemaFields = Object.keys(PlayerStats.schema.obj)
    fieldsToUpdate.forEach(field => {
        if(!validSchemaFields.includes(field)) {
            console.warn({ message: `Request body uses unsupported field: ${field}`}) // create obfuscated error codes instead of telling which field was invalid, else attackers can generate lists of field names and see which are valid or invalid!
        }
    })
    next()
}

module.exports = router