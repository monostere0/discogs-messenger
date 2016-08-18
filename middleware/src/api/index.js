const router = require('koa-router')();

router.get('/api', require('./routes'));
router.get('/api/auth', require('./routes/auth'));
router.get('/api/identity', require('./routes/identity'));
router.get('/api/orders', require('./routes/orders'));

module.exports = router;