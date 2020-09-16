const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ingredient = new Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    origin: {type: String, default: 'unknown'},
    subsitutes: [ingredients]/*,
    image */
});

const Recipe = new Schema({
    name: {type: String, required : true, unique : true},
    description: {type: String},
    origin: {type: String, default: 'unknown'},
    ingredients: [{ingredient: Ingredient, quantity: String}],
    nbEaters: Number,
    //tools: [String]
    steps: [{text: String /*, image: */}],
    additionalNoteFromAutor: String
});


module.exports = mongoose.model('Recipe', Recipe);
module.exports = mongoose.model('Ingredient', Ingredient);




