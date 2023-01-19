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

module.exports = {
    createPlayer,
    deletePlayer,
    getPlayer,
    getPlayers,
    updatePlayer,
}