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
    getByName
    /*authenticate,
    
    getById,
    ,
    delete: _delete*/
};

/*name: {type: String, required : true, unique : true},
    description: {type: String},
    origin: {type: String, default: 'unknown'},
    ingredients: [{ingredient: Ingredient, quantity: String}],
    nbEaters: Number,
    //tools: [String]
    steps: [{text: String /*, image: /}],
    additionalNoteFromAutor: String,
    author: string*/

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
    console.log("recipe returned : " , recipe);

    if (!recipe) throw 'Recipe not found';
    id = "5f632e4ccce8fe1ec4122ad1";//only for testing server side. Id will be filled by the interface
    const user = await userService.getById(id);

    if (!user) throw 'user not found';


    if(user && user.name == recipe.author)
    {
        if(recipeParams.newName){
            const { newName, ...paramsUpdated } = recipeParams;
            recipeParams.name = newName;
        }
        Object.assign(recipe, recipeParams);
        console.log("recipe updated" , recipe);

        await recipe.save();
    }
    else{
        throw "permission refused you have no right to update this recipe"
    }
}


async function getByName(name) {
    return await Recipe.findOne({name});
}


async function getAll() {
    return await Recipe.find({});
}
