const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const reviewsCtrl = require('../controllers/reviews');

// GET :id/reviews/edit
router.get('/:id/reviews/:reviewId/edit', ensureLoggedIn, reviewsCtrl.edit)

// POST :id/reviews
router.post('/:id/reviews', ensureLoggedIn, reviewsCtrl.create);

// DELETE :id/reviews
router.delete('/:id', ensureLoggedIn, reviewsCtrl.delete);

// PUT :id/reviews
router.put('/:id/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.update)



module.exports = router;