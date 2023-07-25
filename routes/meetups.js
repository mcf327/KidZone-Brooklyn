const express = require('express');
const router = express.Router();
const meetupsCtrl = require('../controllers/meetups');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /meetups/all
router.get('/all', ensureLoggedIn, meetupsCtrl.allMeetups);

// GET /meetups/new
router.get('/new', ensureLoggedIn, meetupsCtrl.new);

// POST /meetups/all
router.post('/all', ensureLoggedIn, meetupsCtrl.create);

module.exports = router;