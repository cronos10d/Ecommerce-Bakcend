const express = require('express');
const router = express.Router();

module.exports = (cartController) => {
  router.post('/', (req, res) => cartController.create(req, res));
  router.get('/', (req, res) => cartController.getAll(req, res));
  return router;
};


