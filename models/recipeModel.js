const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Recipe = new Schema({
    name: {type: String, required : true, unique : true},
    description: {type: String},
    origin: {type: String, default: 'unknown'},
    //ingredients: [{ingredient: Ingredient, quantity: String}],
    nbEaters: Number,
    //tools: [String]
    steps: [String /*, image: */],
    additionalNoteFromAutor: String,
    author: String
});





module.exports = mongoose.model('Recipe', Recipe);





