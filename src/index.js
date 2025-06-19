const express = require('express');
const config = require('./config');
//console.log('>>> Config leída:', config);
const { verifyToken } = require('./adapters/middlewares/authJwt');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./infraestructure/docs/swaggerConfig');
const PasswordHasher = require('./infraestructure/services/PasswordHasher');
const TokenGenerator = require('./infraestructure/services/TokenGenerator');
const SignIn = require('./application/useCases/SignIn');
const authRoutes = require('./adapters/routes/authRoutes');
const userRoutes = require('./adapters/routes/userRoutes');
const SignUp = require('./application/useCases/SignUp');

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



const MongoUserRepository = require('./infraestructure/repositories/MongoUserRepository');
const MySQLUserRepository = require('./infraestructure/repositories/MySQLUserRepository');
const UserController = require('./adapters/controllers/UserController');




const app = express();
const port = config.port;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dependencies
const dbType = config.DB_TYPE || 'mongodb'; // 'mongo' o 'mysql'
let productRepository;
console.log('>>> DB_TYPE:', dbType);
if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();
} else {
  productRepository = new MongoProductRepository();
}

// —– SETUP AUTH —–
const userRepo       = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen       = new TokenGenerator();
const signInUseCase  = new SignIn(userRepo, passwordHasher, tokenGen);
app.use('/api/v1/auth', authRoutes(signInUseCase));

// ——— SETUP SIGNUP ———
const signUpUseCase = new SignUp(userRepo, passwordHasher);
app.use('/api/v1/users',express.json(),userRoutes(signUpUseCase));


const cartRepository = dbType === 'mysql' ? new MySQLCartRepository() : new MongoCartRepository();
const orderRepository = dbType === 'mysql' ? new MySQLOrderRepository() : new MongoOrderRepository();
//const cuponRepository = dbType === 'mysql' ? new MySQLCuponRepository() : new MongoCuponRepository();
//const userRepository = dbType === 'mysql' ? new MySQLUserRepository() : new MongoUserRepository();


const productController = new ProductController(productRepository);
const cartController = new CartController(cartRepository);
const orderController = new OrderController(orderRepository);
const cuponController = new OrderController(orderRepository);
//const userController = new UserController(userRepository);

// Configuración de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
 
// Routes
app.use('/api/v1/products',  productRoutes(productController));
app.use('/api/v1/carts', cartRoutes(cartController));
app.use('/api/v1/orders', orderRoutes(orderController));
app.use('/api/v1/cupons', orderRoutes(cuponController));
//app.use('/api/v1/users', userRoutes(userController));





// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});
 
// Start Server

app.listen(port, () => {
  console.log(`E-commerce server running on port http://localhost:${port}`);
});
