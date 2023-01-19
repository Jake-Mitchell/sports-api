const Games = require('../models/games')

const createGame = async (req, res) => {
    const game = new Games({...req.body})
    try {
        const newGameResult = await game.save()
        res.status(201).json(newGameResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getGame = async (req, res) => {
    let game
    try {
        game = await Games.findById(req.params.id)
        if (game == null) {
            return res.status(400).json({ message: "Cannot find player stats"})
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.game = game
    res.send(res.game)
}

const getGames = async (_req, res) => {
    try {
        const games = await Games.find()
        res.json(games)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const deleteGame = async (req, res) => {
    try {
        await Games.findByIdAndDelete(
            req.params.id,
        )
        res.json({ message: "Deleted game"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateGame = async (req, res) => {
    try {
        const updatedGameResult = await Games.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        res.json(updatedGameResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const seedDatabaseWithGames = async (req, res, next) => {
    const [ team1, team2, team3, team4 ] = req.seedTeams

    try {
        const gamesResult = await Games.insertMany([
            {
                date: "03/12/23",
                homeTeamId: team1._id,
                awayTeamId: team2._id,
                winningTeamId: team1._id,
                winningScore: 12,
                losingScore: 5,
            },
            {
                date: "03/14/23",
                homeTeamId: team2._id,
                awayTeamId: team1._id,
                winningTeamId: team1._id,
                winningScore: 7,
                losingScore: 6,
            },
            {
                date: "03/17/23",
                homeTeamId: team1._id,
                awayTeamId: team3._id,
                winningTeamId: team3._id,
                winningScore: 8,
                losingScore: 2,
            },
            {
                date: "03/28/23",
                homeTeamId: team3._id,
                awayTeamId: team2._id,
                winningTeamId: team3._id,
                winningScore: 4,
                losingScore: 3,
            },
            {
                date: "04/03/23",
                homeTeamId: team2._id,
                awayTeamId: team3._id,
                winningTeamId: team2._id,
                winningScore: 6,
                losingScore: 4,
            },
            {
                date: "04/08/23",
                homeTeamId: team4._id,
                awayTeamId: team1._id,
                winningTeamId: team1._id,
                winningScore: 7,
                losingScore: 6,
            },
            {
                date: "04/12/23",
                homeTeamId: team1._id,
                awayTeamId: team4._id,
                winningTeamId: team1._id,
                winningScore: 8,
                losingScore: 3,
            },
            {
                date: "04/19/23",
                homeTeamId: team4._id,
                awayTeamId: team2._id,
                winningTeamId: team4._id,
                winningScore: 9,
                losingScore: 8,
            },
            {
                date: "04/23/23",
                homeTeamId: team2._id,
                awayTeamId: team4._id,
                winningTeamId: team4._id,
                winningScore: 6,
                losingScore: 4,
            },
            {
                date: "04/30/23",
                homeTeamId: team4._id,
                awayTeamId: team3._id,
                winningTeamId: team4._id,
                winningScore: 11,
                losingScore: 6,
            },
        ])
        req.seedGames = gamesResult
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

module.exports = {
    createGame,
    deleteGame,
    getGame,
    getGames,
    seedDatabaseWithGames,
    updateGame,
}