const router = require('express').Router();

const userRoutes = require('./user-routes');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', userRoutes);

module.exports = router;
