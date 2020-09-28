const db = require('_helpers/db');
const models = require("../models");
const userService = require("../users/user.service");

const Recipe = db.Recipe;
const User = db.User;
const Ingredient = db.Ingredient;


module.exports = {
    create,
    getAll,
    getByName,
    delete : _delete
};


async function create(ingredientParams) {

    if (await Ingredient.findOne({ name: ingredientParams.name })) {
        throw 'Ingredient name "' + ingredientParams.name + '" is already taken';
    }

    //const ingredients = new Ingredient
    const ingredient = new Ingredient({
        name : ingredientParams.name
    });
    if(ingredientParams.description)
        ingredient.description = ingredientParams.description;
    
    if(ingredientParams.origin)
        ingredient.origin = ingredientParams.origin;

    console.log(ingredient);
    await ingredient.save();

}


async function _delete(id) {
    try{
        await Ingredient.findByIdAndRemove(id);
    }
    catch(e){
        console.error(e);
        throw e;
    }
}
   


async function getByName(name) {
    return await Ingredient.findOne({name});
}


async function getAll() {
    return await Ingredient.find({});
}
