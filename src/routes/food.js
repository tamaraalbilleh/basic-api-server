'use strict';
const express = require ('express');
const Food = require ('../models/food.js');
const food = new Food ();
const router = express.Router();

router.post ('/', foodAddHandler);
router.get ('/', foodReadAllHandler);
router.get ('/:id', foodReadOneHandler);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

function foodAddHandler (req,res){
  const foodObj = req.body;
  const resObj = food.create(foodObj);
  res.status(201).json(resObj);

}

function foodReadAllHandler (req,res){
  let foodObject = food.read ();
  res.json (foodObject);
}

function foodReadOneHandler (req,res){
  const foodObject = food.read(req.params.id);
  res.json(foodObject);
}

function deleteFood(req, res) {
  const foodObject = food.delete(req.params.id);
  res.json(foodObject);
}

function updateFood(req, res) {
  const foodObj = req.body;
  const foodObject = food.update(req.params.id, foodObj);
  res.json(foodObject);
}

module.exports = router;