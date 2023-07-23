const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /locations/all - all locations regardless of user
router.get('/all', locationsCtrl.allLocations);

// GET /locations/new
router.get('/new', ensureLoggedIn, locationsCtrl.new);

// POST /locations
router.post('/all', ensureLoggedIn, locationsCtrl.create);

// Get /locations - list of locations added by logged in user



module.exports = router;