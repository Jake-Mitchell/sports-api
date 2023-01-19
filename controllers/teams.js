// import { Teams } from "../models/teams";
const Teams = require('../models/teams')

 const createTeam = async (req, res, next) => {
    const team = new Teams({...req.body})
    try {
        const newTeamResult = await team.save()
        res.status(201).json(newTeamResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

// export const seedDatabaseWithTeams = async (_req, res, next) => {
//     try {
//         const newTeamsResult = await Teams.insertMany([
//             {
//                 mascot: "Wildcats",
//                 school: "Checotah High School"
//             },
//             {
//                 mascot: "Tigers",
//                 school: "Oktaha High School"
//             }
//         ])
//         res.status(201).json(newTeamsResult)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
//     next()
// }

const getAllTeams = async (_req, res) => {
    try {
        const teams = await Teams.find()
        res.json(teams)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const getTeam = async (req, res) => {
    let team
    try {
        team = await Teams.findById(req.params.id)
        if (team == null) {
            return res.status(400).json({ message: "Cannot find team"})
        } 
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.send(team)
}

module.exports = {
    createTeam,
    getAllTeams,
    getTeam,
}