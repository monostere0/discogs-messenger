const Router = require('koa-router');

const authMiddleware = require('./middlewares/auth');
const router = new Router({ prefix: '/api' });

router.get('/', require('./routes/index'));
router.get('/auth', require('./routes/auth'));
router.get('/identity', require('./routes/identity'));
router.get('/orders', authMiddleware, require('./routes/orders'));
router.get('/messages/:orderId', authMiddleware, require('./routes/messages'));

module.exports = router;