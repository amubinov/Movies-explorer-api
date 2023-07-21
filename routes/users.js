const userRoutes = require('express').Router();
const {
  changeUser, getUserMe,
} = require('../controllers/users');
const {
  validateChangeUser,
} = require('../middlewares/validate');

// Роуты пользователя
userRoutes.get('/me', getUserMe);
userRoutes.patch('/me', validateChangeUser, changeUser);

module.exports = userRoutes;
