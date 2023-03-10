### Sports REST API

Welcome to my REST API for managing and storing sports data primarily focused on retrieving baseball data for high school teams. This is a P.O.C. project for LigoSports.

# Tech stack

- Javascript
- Node.js
- Express
- Mongoose
- MongoDB

# Business requirements

- Ability to query for lists of player data based off of games
- Ability to generate seed (stubbed) data for players, games, and teams
- Ability to query for the season totals statistics of each player

# Entity Relationship Model
> The first Id fields in a table are primary keys, any following Ids are foreign keys.
<img width="598" alt="Screenshot 2023-01-19 at 10 13 50 AM" src="https://user-images.githubusercontent.com/39348241/213526701-27aac9c7-30e6-466a-b7cb-67ef9eab65cd.png">

# Running the app
- The current version of node used for this project is listed in the .nvmrc file in the main directory
- Install all necessary node modules
- Add a .env file inside of the root directory. The values needed in your .env file are shown in the .env.sample file. You can just copy everything in the .env.sample and past it in your .env
- In the main directory, run "npm devstart" to start the local server at port 3000
- Install the "Rest Client" plugin for Visual Studio Code to easily interact with the API
- Seed the database by using the `POST http://localhost:3000/seed` command inside of `/routes/seedDataRoutes.rest` it will be interactive with a "send request" button after downloading the "Rest Client" plugin
- Read, create, update, or delete new data by using the files ending in `.rest` that are housed inside of the `/routes` folder
- To query for a player and see their information and season statistics, navigate to `/routes/playersRoutes.rest and use the second GET request for a single player


# notes
- The seed data function sanitizes the database to maintain purity. So, if you run it again it will clear any data out that has been created.
- As of now the generated data is not a realistic dataset, I went off of a template provided via [this document](https://docs.google.com/spreadsheets/d/1y5nzlebh7pAXxKLc7KKQZXCNCp9_O8YJ9BqRTbyZl9s/edit#gid=0). The generate data function can sometimes create unrealistic numbers for the dataset. I didn't spend the time to refine this. However, the functionality of the infrustructure of this API to store and create the correct data is fully working.
- Everything was manually tested but not with automated tests yet. I usually use Supertest for every API endpoint, and Jest for unit testing helper functions.
- Order of creation for documents is: Team -> Players -> Game -> PlayerStats. This flow of data creation needs to be maintained in the correct order with the current data model in order for the foreign keys in each table to be populated correctly. First a Team needs to exist because a Player has a relationship with a Team. Then A Game is created because it also has a relationship to two teams. PlayerStats is the last documentent to be inserted in the database because it has a relationship with both the player and the game they were playing.

# Developing

Use [nvm](https://github.com/nvm-sh/nvm) to make sure you are on a consistent node version for this project.
Run `nvm install` and then `nvm use` to download and use the node version specified in `.nvmrc`

# MongoDB Compass
- A visual representation of the data can be gained via MongoDB's Compass App. It will run on the default port for Mongo once installed and the seed data has been run

<img width="1721" alt="Screenshot 2023-01-19 at 10 18 49 AM" src="https://user-images.githubusercontent.com/39348241/213527655-2194ae00-3ef0-4052-8cd8-e5bfbaf05d95.png">


