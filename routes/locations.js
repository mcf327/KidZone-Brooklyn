const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /locations/all
router.get('/all', locationsCtrl.allLocations);

// GET /locations/new
router.get('/new', ensureLoggedIn, locationsCtrl.new);

// GET /locations (added by current user)
router.get('/', ensureLoggedIn, locationsCtrl.myLocations);

// GET /locations/:id
router.get('/:id', locationsCtrl.show);

// GET /locations/:id/edit
router.get('/:id/edit', ensureLoggedIn, locationsCtrl.edit);

// POST /locations
router.post('/all', ensureLoggedIn, locationsCtrl.create);

// DELETE /locations/:id
router.delete('/:id', ensureLoggedIn, locationsCtrl.delete)

// PUT /locations/:id
router.put('/:id', ensureLoggedIn, locationsCtrl.update);




module.exports = router;