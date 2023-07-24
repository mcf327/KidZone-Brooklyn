const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const reviewsCtrl = require('../controllers/reviews');

// POST :id/reviews
router.post('/:id/reviews', ensureLoggedIn, reviewsCtrl.create);

// DELETE :id/reviews
router.delete('/:id', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;