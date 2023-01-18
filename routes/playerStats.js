const express = require('express')
const router = express.Router()
const PlayerStats = require('../models/playerStats')

// Getting all
router.get('/', async (req, res) =>  {
    // res.send('Hello World')
    try {
        const playerStats = await PlayerStats.find()
        res.json(playerStats)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Getting one
router.get('/:id', getPlayerStats, (req, res) =>  {
    res.send(res.playerStats)
})

// Creating one
router.post('/', async (req, res) =>  {
    const playerStats = new PlayerStats({
        name: req.body.name,
        number: req.body.number,
        atBats: req.body.atBats,
        battingAverage: req.body.battingAverage,
        // playerId: req.body.playerId,
        // gameId: req.body.gameId,
        runs: req.body.runs,
        plateAppearances: req.body.plateAppearances,
        runsBattedIn: req.body.runsBattedIn,
        doubles: req.body.doubles,
        singles: req.body.singles,
        triples: req.body.triples,
        homeruns: req.body.homeruns,
    })

    try {
        const newPlayerStatsResult = await playerStats.save()
        res.status(201).json(newPlayerStatsResult)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }

})

// Updating one
router.patch('/:id', (req, res) =>  {

})

// Deleting one
router.delete('/:id', (req, res) =>  {

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

module.exports = router