const express = require('express');
const router = express.Router();

module.exports = (orderController) => {
 /**
   * @swagger
   * tags:
   *   name: Orders
   *   description: Gestión de órdenes
   */

  /**
   * @swagger
   * /api/v1/orders:
   *   post:
   *     summary: Crea una nueva orden
   *     tags: [Orders]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Order'
   *     responses:
   *       201:
   *         description: Orden creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       400:
   *         description: Datos de orden inválidos
   *       401:
   *         description: No autorizado
   */
  
  router.post('/', (req, res) => orderController.create(req, res));

  

  
  router.get('/', (req, res) => orderController.getAll(req, res));
  return router;
};


