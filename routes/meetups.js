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

// DELETE /meetups/:id
router.delete('/:id', ensureLoggedIn, meetupsCtrl.delete);

// PUT /meetups/:id
router.put('/:id', ensureLoggedIn, meetupsCtrl.signUp);

// PUT /meetups/:id/removeMe
router.put('/:id/removeMe', ensureLoggedIn, meetupsCtrl.removeMe);

module.exports = router;