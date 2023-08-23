const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/ProductService', {
      target: 'http://eas-api.edu.koobietech.com',
      changeOrigin: true,
      pathRewrite: { '^/ProductService': '' },
    })
  );
};
