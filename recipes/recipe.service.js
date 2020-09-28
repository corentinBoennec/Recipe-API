const db = require('_helpers/db');
const models = require("../models");
const userService = require("../users/user.service");

const Recipe = db.Recipe;
const User = db.User;
const Ingredient = db.Ingredient;


module.exports = {
    create,
    update,
    getAll,
    getByName,
    delete : _delete
};


async function create(recipeParams) {

    if (await Recipe.findOne({ name: recipeParams.name })) {
        throw 'Recipe name "' + recipeParams.name + '" is already taken';
    }

    //const ingredients = new Ingredient
    const recipe = new Recipe({
        name : recipeParams.name
    });
    if(recipeParams.description)
        recipe.description = recipeParams.description;
    
    if(recipeParams.origin)
        recipe.origin = recipeParams.origin;

    if(recipeParams.nbEaters)
        recipe.nbEaters = recipeParams.nbEaters;

    recipeParams.steps.forEach(element => {
        recipe.steps.push(element);
    });
        
    // save recipe
    await recipe.save();

}



async function update(name, id, recipeParams) {

    const recipe = await getByName(name);

    if (!recipe) throw 'Recipe not found';
    const user = await userService.getById(id);

    if (!user) throw 'user not found';


    if(user && user.name == recipe.author)
    {
        if(recipeParams.newName){
            const { newName, ...paramsUpdated } = recipeParams;
            recipeParams.name = newName;
        }
        Object.assign(recipe, recipeParams);

        await recipe.save();
    }
    else{
        throw "permission refused you have no right to update this recipe"
    }
}

async function _delete(recipe_name, id_author) {
    const recipe = await getByName(recipe_name);

    if (!recipe) throw 'Recipe not found';
    const user = await userService.getById(id);

    if (!user) throw 'user not found';


    if(user && user.name == recipe.author)
    {
       await Recipe.findByIdAndRemove(recipe.id);
    }
    else{
        throw "permission refused you have no right to delete this recipe"
    }
}


async function getByName(name) {
    return await Recipe.findOne({name});
}


async function getAll() {
    return await Recipe.find({});
}
