const router = require('koa-router')();

router.get('/api', require('./routes'));
router.get('/api/auth', require('./routes/auth'));
router.get('/api/identity', require('./routes/identity'));
router.get('/api/orders', require('./routes/orders'));
router.get('/api/messages/:orderId', require('./routes/messages'));

module.exports = router;
