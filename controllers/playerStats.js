// import { Request, Response, NextFunction } from "express";
import { PlayerStats } from "../models/playerStats";


// create this after creating Teams and Players mongoDB collections and mongoose schemas
const seedDatabaseWithEntries = async (
    _req,
    res,
    _next,
) => {
    //create teams
    // const Teams = await Teams.insertMany([])
    // get all generated _ids to map to players!
    // make two teams!

    // create players
    // const Players = await Players.insertMany([
    //   {
    //     name: "Landon R.",
    //     age: 17,
    //     class: "Junior",
    //     number: 44,
    //     team: "teamId"
    //   },
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    //   {},
    // ])

    // create games
    // await Games.insertMany([])


    // create player game stats
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
}

export {
    seedDatabaseWithEntries,
}