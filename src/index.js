const express = require('express');
const config = require('./config');

const MongoProductRepository = require('./infraestructure/repositories/MongoProductRepository');
const MySQLProductRepository = require('./infraestructure/repositories/MySQLProductRepository');
const ProductController = require('./adapters/controllers/ProductController');
const productRoutes = require('./adapters/routes/productRoutes');

const MongoCartRepository = require('./infraestructure/repositories/MongoCartRepository');
const MySQLCartRepository = require('./infraestructure/repositories/MySQLCartRepository');
const CartController = require('./adapters/controllers/CartController');
const cartRoutes = require('./adapters/routes/cartRoutes');

const MongoOrderRepository = require('./infraestructure/repositories/MongoOrderRepository');
const MySQLOrderRepository = require('./infraestructure/repositories/MySQLOrderRepository');
const OrderController = require('./adapters/controllers/OrderController');
const orderRoutes = require('./adapters/routes/orderRoutes');

const { verifyToken } = require('./adapters/middlewares/authJwt');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./infraestructure/docs/swaggerConfig');


const app = express();
const port = config.port;

// Dependencies
const dbType = config.DB_TYPE || 'mongodb'; // 'mongo' o 'mysql'
let productRepository;
console.log('>>> DB_TYPE:', dbType);
if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();
} else {
  productRepository = new MongoProductRepository();
}


const cartRepository = dbType === 'mysql' ? new MySQLCartRepository() : new MongoCartRepository();
const orderRepository = dbType === 'mysql' ? new MySQLOrderRepository() : new MongoOrderRepository();


const productController = new ProductController(productRepository);
const cartController = new CartController(cartRepository);
const orderController = new OrderController(orderRepository);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
 
// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/carts', cartRoutes(cartController));
app.use('/api/v1/orders', orderRoutes(orderController));
 
// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});
 
// Start Server
/*
app.listen(port, () => {
  console.log(`E-commerce server running on port ${port}`);
});
*/
 

app.listen(port, () => {
  console.log(`E-commerce server running on port http://localhost:${port}`);
});
