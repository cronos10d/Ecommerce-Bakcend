const swaggerJSDoc = require('swagger-jsdoc');

const config = require('../../config');
const Order = require('../../domain/entities/Order');

const port = config.port;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce con autenticación y gestión de productos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            price: {
              type: 'number',
              description: 'Precio del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto'
            },
          },
        },
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Roles del usuario',
              default: ['user']
            }
          },
        },
        Order: {
          type: 'object',
          required: ['creationD', 'products', 'address', 'paymenMethod', 'total', 'shippingDate'],
          properties: {
            creationD: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha que se hizó el pedido',
              example: '2025-06-09T15:00:00Z'
            },
            products: {
              type: 'array',
              description: 'Lista de productos en formato JSON',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  nombre: { type: 'string', example: 'Laptop' },
                  precio: { type: 'number', format: 'float', example: 1200},
                  cantidad: { type: 'integer', example: 2 }
                }
              }
              },
            address: {
              type: 'string',
              maxLength: 255,
              description: 'Dirección de envío para llevar la orden',
              example: 'Av. Siempre Viva 123'
              },
              paymenMethod: {
                type: 'string',
                maxLength: 50,
                description: 'Método de pago',
                example: 'Tarjeta o Qr'
              },
            total: {
              type: 'number',
              format: 'float',
              description: 'Total del pedido',
              example: 2400.50
            },
            shippingDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha estimada de envío',
              example: '2025-06-25T00:00:00Z'
            }
            }

        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT token de autenticación'
            }
          }
        }
      },
    },
  },
  
  apis: ['./src/adapters/routes/*.js'],
};
 

module.exports = swaggerJSDoc(options);

