const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/CardSelection/Data',
      createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/CardSelection/Data': '/generic-metrics/card-selection',
        },
      })
    );
  } else if (process.env.NODE_ENV === 'production') {
    app.use(
      '/CardSelection/Data',
      createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/CardSelection/Data': '/generic-metrics/card-selection',
        },
      })
    );
  }
};
