const express = require('express');
const router = express.Router();
const { ingredient } = require('../models');
const ingredientService = require('./ingredients.service');
const ingredientsService = require('./ingredients.service');

// routes
router.post('/create', create); //TODO : gerer d'autres élément comme les images / substitues 
router.get('/searchName/:name', getByName);
//router.put('/:name', update);
router.get('/', getAll);
router.delete('/:id', _delete);


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
    ingredientService.create(req.body)
        .then(ingredient => res.json(ingredient))
        .catch(err => next(err));
}


function getByName(req, res, next) {
    ingredientService.getByName(req.params.name)
        .then(recipe => recipe ? res.json(recipe) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    ingredientService.getAll()
        .then(ingredients => res.json(ingredients))
        .catch(err => next(err));
}


function _delete(req, res, next) {
    ingredientService.delete(req.params.name, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}
