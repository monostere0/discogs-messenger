const Router = require('koa-router');

const router = new Router();

router.get('/api', require('./routes/index'));
router.get('/api/auth', require('./routes/auth'));
router.get('/api/identity', require('./routes/identity'));
router.get('/api/orders', require('./routes/orders'));
router.get('/api/messages/:orderId', require('./routes/messages'));

module.exports = router;
