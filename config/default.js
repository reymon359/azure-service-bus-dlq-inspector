module.exports = {
  server: {
    host: '0.0.0.0',
    port: 6400,
  },

  bus: {
    connection: {
      connectionString: process.env.AZURE_SERVICEBUS_CONNECTION_STRING,
    },
    subscriptions: {
      default: {
        topic: 'ecommerce-proxy.v1.product.updated',
        subscription: 'noord-orders-api',
        errorHandling: {
          strategy: 'exponentialBackoff',
          options: {
            measure: 'seconds',
            attempts: 3,
          },
        },
      },
    },
    publications: {
      productUpdated: {
        topic: 'ecommerce-proxy.v1.product.updated'
      },
    },
  },
  logger: {
    transport: 'console',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'service',
    ],
    exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
  },
};
