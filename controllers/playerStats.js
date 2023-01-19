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
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.playerStats = playerStats
    res.send(res.playerStats)
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

// create this after creating Teams and Players mongoDB collections and mongoose schemas
const seedDatabaseWithPlayerStats = async (
    req,
    res,
    next,
) => {
    console.log("teams", req.seedTeams)
    console.log("players", req.seedPlayers)
    console.log("games", req.seedGames)
    try {
        // create 120! player game stats, 10 per the 12 players!
        // await PlayerStats.insertMany([
        //     {},
        //     {},
        //     {},
        //     {},
        //     {},
        //     {},
        //     {},
        //     {},
        // ])
    
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
            console.warn({ message: `Request body uses unsupported field: ${field}`}) // create obfuscated error codes instead of telling which field was invalid, else attackers can generate lists of field names and see which are valid or invalid!
        }
    })
    next()
}


module.exports = {
    checkForInvalidFields,
    createPlayerStats,
    deletePlayerStats,
    getAllPlayerStats,
    getPlayerStats,
    seedDatabaseWithPlayerStats,
    updatePlayerStats,
}