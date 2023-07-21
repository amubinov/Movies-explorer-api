const express = require('express');

const router = express.Router();

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFound-error');
const { validateCreateUser, validateLogIn } = require('../middlewares/validate');
const { createUser, logIn, logOut } = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogIn, logIn);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.post('/signout', logOut);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
