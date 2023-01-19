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

const seedDatabaseWithTeams = async (req, res, next) => {
    try {
        const teamsResult = await Teams.insertMany([
            {
                mascot: "Wildcats",
                school: "Checotah High School",
            },
            {
                mascot: "Tigers",
                school: "Oktaha High School",
            },
            {
                mascot: "Ironheads",
                school: "Eufala High School",
            },
            {
                mascot: "Conquerors",
                school: "Victory Christian High School",
            },
        ])
        req.seedTeams = teamsResult
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    next()
}

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

const updateTeam = async (req, res) => {
    try {
        const updatedTeamResult = await Teams.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        res.json(updatedTeamResult)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteTeam = async (req, res) => {
    try {
        await Teams.findByIdAndDelete(
            req.params.id,
        )
        res.json({ message: "Deleted team"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const checkForInvalidTeamFields = async (req, _res, next) => {
    const fieldsToUpdate = Object.keys(req.body)
    const validSchemaFields = Object.keys(Teams.schema.obj)
    fieldsToUpdate.forEach(field => {
        if(!validSchemaFields.includes(field)) {
            console.warn({ message: `Request body uses unsupported field: ${field}`}) // create obfuscated error codes instead of telling which field was invalid, else attackers can generate lists of field names and see which are valid or invalid!
        }
    })
    next()
}

module.exports = {
    checkForInvalidTeamFields,
    createTeam,
    deleteTeam,
    getAllTeams,
    getTeam,
    seedDatabaseWithTeams,
    updateTeam,
}