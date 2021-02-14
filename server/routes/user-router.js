const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/', UserCtrl.createUser);
router.put('/:id', UserCtrl.updateUser);
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)

module.exports = router;