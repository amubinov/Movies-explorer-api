const movieRoutes = require('express').Router();

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validate');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateCreateMovie, createMovie);
movieRoutes.delete('/:id', validateDeleteMovie, deleteMovieById);

module.exports = movieRoutes;
