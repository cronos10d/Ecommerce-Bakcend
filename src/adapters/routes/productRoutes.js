const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/AdminProduct');
module.exports = (productController) => {

  /*
  **
    * @swagger
    * tags:
    *   name: Products
    *   description: Gestión de productos
    */
 
  /**
   * @swagger
   * /api/v1/products:
   *   get:
   *     summary: Obtiene todos los productos
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de productos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       401:
   *         description: No autorizado
   *       500:
   *         description: Error del servidor
   */
 
  /* router.post('/', (req, res) => productController.create(req, res));*/
    router.post('/', authorizeRole(['admin']), (req, res) => productController.create(req, res));
  /*router.get('/', (req, res) => productController.create(req, res));*/
  router.get('/', (req, res) => productController.getAll(req, res));
  return router;


  
};

