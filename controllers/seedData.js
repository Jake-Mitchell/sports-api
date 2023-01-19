const mongoose = require('mongoose')

const dropCollections = async (_req, _res, next) => {
      const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
    }
    next()
  };

module.exports = {
    dropCollections,
}