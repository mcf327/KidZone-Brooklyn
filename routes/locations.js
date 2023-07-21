const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');

// GET /locations
router.get('/locations', locationsCtrl.index);


module.exports = router;