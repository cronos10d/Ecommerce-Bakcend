const express = require('express');

module.exports = (cuponController) => {
  const router = express.Router();

  router.post('/', (req, res) => cuponController.create(req, res));

  return router;
};