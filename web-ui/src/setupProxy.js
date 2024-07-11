const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/CardSelects/Data',
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: {
                '^/CardSelection/Data': '/generic-metrics',
            },
        })
    );
};
