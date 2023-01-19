const PlayerStats = require("../models/playerStats")

const getAllPlayerStats = async (req, res) => {
    try {
        const playerStats = await PlayerStats.find()
        res.json(playerStats)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const getPlayerStats = async (req, res) => {

    let playerStats
    try {
        playerStats = await PlayerStats.findById(req.params.id)
        if (playerStats == null) {
            return res.status(400).json({ message: "Cannot find player stats"})
        } 
        res.playerStats = playerStats
        res.send(res.playerStats)
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}

const createPlayerStats = async (req, res) => {
    const playerStats = new PlayerStats({...req.body})

    try {
        const newPlayerStatsResult = await playerStats.save()
        res.status(201).json(newPlayerStatsResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const seedDatabaseWithPlayerStats = async (req, res, next) => {
    const seedPlayers = req.seedPlayers
    const seedGames = req.seedGames
    try {
        const playersStatsData = await seedPlayers.map(player => {
            let total = [];
            seedGames.forEach(game => {
                if(game.winningTeamId == player.teamId|| game.losingTeamId === player.teamId) {
                    total.push({
                        playerId: player._id,
                        gameId: game._id,
                        atBats: Math.floor(Math.random() * 6),
                        battingAverage: Math.random(),
                        runs: Math.floor(Math.random() * 5),
                        plateAppearances: Math.floor(Math.random() * 7),
                        runsBattedIn: Math.floor(Math.random() * 6),
                        hits: Math.floor(Math.random() * 8),
                        doubles: Math.round(Math.random()),
                        triples: Math.round(Math.random() - 0.25),
                        homeruns: Math.round(Math.random() - 0.35 ),
                    })
                }
            })
            return total
        })
        const flattenedPlayerStatsData = [].concat(...playersStatsData)
        const playerStatsResult = await PlayerStats.insertMany(flattenedPlayerStatsData)
        res.status(201).json(playerStatsResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

const updatePlayerStats = async (req, res) => {
    try {
        const updatedPlayerStatsResult = await PlayerStats.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        res.json(updatedPlayerStatsResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deletePlayerStats = async (req, res) => {
    try {
        await PlayerStats.findByIdAndDelete(
            req.params.id,
        )
        res.json({ message: "Deleted player stats"})
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}

const checkForInvalidFields = (req, _res, next) => {
    const fieldsToUpdate = Object.keys(req.body)
    const validSchemaFields = Object.keys(PlayerStats.schema.obj)
    fieldsToUpdate.forEach(field => {
        if(!validSchemaFields.includes(field)) {
            console.warn({ message: `Request body uses unsupported field: ${field}`})
        }
    })
    next()
}

const getPlayerSeasonTotals = async (req, res, next) => {
    const playerId = req.player?.id
    if(playerId) {
      const allPlayerStats = await PlayerStats.find({ playerId })
      const seasonTotals = {
        battingAverage: 0,
        atBats: 0,
        runs: 0,
        plateAppearances: 0,
        runsBattedIn: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        homeruns: 0,
      }

        try {
            allPlayerStats.forEach(stats => {
                const { battingAverage = 0, runs = 0, plateAppearances = 0, runsBattedIn = 0, hits = 0, doubles = 0, triples = 0, homeruns = 0} = stats
                seasonTotals.battingAverage += battingAverage
                seasonTotals.runs += stats.runs
                seasonTotals.plateAppearances += plateAppearances
                seasonTotals.runsBattedIn += runsBattedIn
                seasonTotals.hits += hits
                seasonTotals.doubles += doubles
                seasonTotals.triples += triples
                seasonTotals.homeruns += homeruns
            })
            res.json({
                ...req.player._doc,
                ...seasonTotals,
                battingAverage: seasonTotals.battingAverage / allPlayerStats.length

            })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
}


module.exports = {
    checkForInvalidFields,
    createPlayerStats,
    deletePlayerStats,
    getAllPlayerStats,
    getPlayerSeasonTotals,
    getPlayerStats,
    seedDatabaseWithPlayerStats,
    updatePlayerStats,
}