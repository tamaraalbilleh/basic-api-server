'use strict';
const express = require ('express');
const Clothes = require ('../models/clothes.js');
const clothes = new Clothes ();
const router = express.Router();

router.post ('/', clothesAddHandler);
router.get ('/', clothesReadAllHandler);
router.get ('/:id', clothesReadOneHandler);
router.put('/:id', updateClothes);
router.delete('/:id', deleteClothes);


function clothesAddHandler (req,res){

  const clothesObject = req.body;
  const responseObject = clothes.create(clothesObject);
  res.status(201).json (responseObject);

}

function clothesReadAllHandler (req,res){
  let clothesObject = clothes.read ();
  res.json (clothesObject);
}

function clothesReadOneHandler (req,res){
  const clothesObject = clothes.read(req.params.id);
  res.json(clothesObject);
}

function deleteClothes(req, res) {
  const clothesObject = clothes.delete(req.params.id);
  res.json(clothesObject);
}

function updateClothes(req, res) {
  const clothesObj = req.body;
  const clothesObject = clothes.update(req.params.id, clothesObj);
  res.json(clothesObject);
}

module.exports = router;