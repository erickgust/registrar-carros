'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  res.json({ message: `O carro foi cadastrado com sucesso`});
});

router.delete('/', function(req, res) {
  data = data.filter(function(car) {
    return car.plate !== req.body.plate;
  });
  res.json({ message: `O carro foi removido com sucesso` });
});

module.exports = router;
