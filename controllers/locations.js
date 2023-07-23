const Location = require('../models/location');

async function allLocations(req, res) { 
    try {
        const locations = await Location.find({});
        res.render('locations/all', { title: 'All Locations', locations });
    } catch (err) {
        console.log(err);
        res.render('err', { message: 'An error occurred getting locations list.' });
    }
}

function newLocation(req, res) {
    res.render('locations/new', { title: 'Add Location', errorMsg: ''});
}

async function create(req, res) {
    req.body.childEquipped = !!req.body.childEquipped;
    const location = new Location(req.body);
    location.userRec = req.user._id;
    try {
        await location.save();
        res.redirect(`/locations/all`);
    } catch (error) {
        console.log(error);
        res.redirect(`/locations/new`);
    }
}

module.exports = {
    allLocations,
    new: newLocation,
    create
}