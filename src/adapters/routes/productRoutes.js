const express = require('express');
const router = express.Router();
const authorizeRole = require('../middlewares/AdminProduct');
const { verifyToken } = require('../middlewares/authJwt');
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
    router.post('/', verifyToken, authorizeRole(['admin']), (req, res) => productController.create(req, res));
    /**
   * @swagger
   * /api/v1/products:
   *   post:
   *     summary: Crea un nuevo producto
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Product'
   *     responses:
   *       201:
   *         description: Producto creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Datos de producto inválidos
   *       401:
   *         description: No autorizado
   */
    

    router.get('/', (req, res) => productController.getAll(req, res));
    return router;


  
};

