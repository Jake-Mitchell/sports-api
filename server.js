require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())

const playersRouter = require('./routes/players')
const playerStatsRouter = require('./routes/playerStats')
const teamsRouter = require('./routes/teams')

app.use('/players', playersRouter)
app.use('/playerStats', playerStatsRouter)
app.use('/teams', teamsRouter)



app.listen(3000, () => console.log("Server Started on localhost:3000"))