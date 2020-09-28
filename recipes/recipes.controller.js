const express = require('express');
const router = express.Router();
const { recipe } = require('../models');
const recipeService = require('./recipe.service');

// routes
router.post('/create', create); //TODO : gerer d'autres élément comme les images / ustensiles 
router.get('/searchName/:name', getByName);

router.put('/:name', update);

router.get('/', getAll);

router.delete('/:name', _delete);


//to test

/*
//delete
router.delete('/:id', _delete);


//get by ingrédient
router.get('/searchIngredient/:ingredient', getByIngredient);
*/




module.exports = router;

function create(req, res, next) {
    console.log(req.body);
    recipeService.create(req.body)
        .then(recipe => res.json(recipe))
        .catch(err => next(err));
}

function update(req, res, next) {
    recipeService.update(req.params.name, req.user.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    recipeService.getByName(req.params.name)
        .then(recipe => recipe ? res.json(recipe) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    recipeService.getAll()
        .then(recipes => res.json(recipes))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    recipeService.delete(req.params.name, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}
/*
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}





function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}



*/