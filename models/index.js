const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.recipe = require("./recipeModel");
db.ingredient = require("./ingredientModel");

module.exports = db;