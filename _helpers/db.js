const config = require('config.json');
const mongoose = require('mongoose');
const {dbUsername, dbPassword, clusterAdress, dbName, secret} = require('../config.json');

try {
    mongoose.connect(
            `mongodb+srv://${dbUsername}:${dbPassword}@${clusterAdress}/${dbName}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Successfully connect to MongoDB.");
} catch (err) {
    console.error("error, failed connect to db", err);
}
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/userModel'),
    Recipe : require('../models/recipeModel'),
    Ingredient : require('../models/ingredientModel')
};
