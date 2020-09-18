const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Ingredient = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    origin: {type: String, default: 'unknown'}/*,
    subsitutes: [Ingredients],
    image */
});


module.exports = mongoose.model('Ingredient', Ingredient);