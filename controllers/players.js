const Players = require('../models/players')

const createPlayer = async (req, res) => {
    const player = new Players({...req.body})
    try {
        const newPlayerResult = await player.save()
        res.status(201).json(newPlayerResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getPlayer = async (req, res) => {
    let player
    try {
        player = await Players.findById(req.params.id)
        if (player == null) {
            return res.status(400).json({ message: "Cannot find player stats"})
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.player = player
    res.send(res.player)
}

const getPlayers = async (_req, res) => {
    try {
        const players = await Players.find()
        res.json(players)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const deletePlayer = async (req, res) => {
    try {
        await Players.findByIdAndDelete(
            req.params.id,
        )
        res.json({ message: "Deleted team"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updatePlayer = async (req, res) => {
    try {
        const updatedPlayerResult = await Players.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        res.json(updatedPlayerResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const seedDatabaseWithPlayers = async (req, res, next) => {
   const [ team1, team2, team3, team4, ] = req.seedTeams
   try {
        const playersResult = await Players.insertMany([
            {
                name: "Rodney Dangerfield",
                class: "Senior",
                number: 3,
                teamId: team1._id,
                dateOfBirth: "09/05/04"
            },
            {
                name: "Tom Mischa",
                class: "Senior",
                number: 24,
                teamId: team2._id,
                dateOfBirth: "09/05/04"
            },
            {
                name: "Jose Zarate",
                class: "Senior",
                number: 16,
                teamId: team3._id,
                dateOfBirth: "09/05/04"
            },
            {
                name: "Frank Williams",
                class: "Junior",
                number: 5,
                teamId: team4._id,
                dateOfBirth: "09/05/05"
            },
            {
                name: "Akellom Rockfield",
                class: "Junior",
                number: 11,
                teamId: team1._id,
                dateOfBirth: "09/05/05"
            },
            {
                name: "Samson Knight",
                class: "Junior",
                number: 8,
                teamId: team2._id,
                dateOfBirth: "09/05/05"
            },
            {
                name: "Kaleb Mandler",
                class: "Sophomore",
                number: 17,
                teamId: team3._id,
                dateOfBirth: "09/05/06"
            },
            {
                name: "Jariel Barnes",
                class: "Sophomore",
                number: 22,
                teamId: team4._id,
                dateOfBirth: "09/05/06"
            },
            {
                name: "Damian Stout",
                class: "Sophomore",
                number: 10,
                teamId: team1._id,
                dateOfBirth: "09/05/06"
            },
            {
                name: "James Briarson",
                class: "Freshman",
                number: 14,
                teamId: team2._id,
                dateOfBirth: "09/05/07"
            },
            {
                name: "Danny Winkler",
                class: "Freshman",
                number: 4,
                teamId: team3._id,
                dateOfBirth: "09/05/07"
            },
            {
                name: "Sam Russell",
                class: "Freshman",
                number: 19,
                teamId: team4._id,
                dateOfBirth: "09/05/07"
            },
        ])
        req.seedPlayers = playersResult
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

module.exports = {
    createPlayer,
    deletePlayer,
    getPlayer,
    getPlayers,
    seedDatabaseWithPlayers,
    updatePlayer,
}