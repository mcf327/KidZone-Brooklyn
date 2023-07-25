const Location = require('../models/location');

async function allLocations(req, res) { 
    try {
        const locations = await Location.find({});
        res.render('locations/all', { title: 'All Locations', locations });
    } catch (err) {
        console.log(err);
        res.render('error', { message: 'An error occurred getting locations list.' });
    }
}

function newLocation(req, res) {
    res.render('locations/new', { title: 'Add Location', errorMsg: ''});
}

async function show(req, res) {
    const location = await Location.findById(req.params.id);
    try {
        res.render('locations/show', { title: 'Details', location: location });
    } catch (error) {
        console.log(error);
        res.redirect('locations/all');
    }
}

async function myLocations(req, res) {
    const locations = await Location.find({ user: req.user._id});
    console.log(locations);
    res.render('locations/my_locations', { title: 'My Locations', locations });
}

async function create(req, res) {
    req.body.childEquipped = !!req.body.childEquipped;
    console.log('Data from form: ', req.body);
    const hoursOfOperation = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i=0; i < days.length; i++) {
        const startHour = req.body[`hoursOfOperation[${i}][startHour]`];
        const startAmPm = req.body[`hoursOfOperation[${i}][startAmPm]`];
        const endHour = req.body[`hoursOfOperation[${i}][endHour]`];
        const endAmPm = req.body[`hoursOfOperation[${i}][endAmPm]`];
        if(startHour && startAmPm && endHour && endAmPm) {
            hoursOfOperation.push({ day: days[i], startHour, startAmPm, endHour, endAmPm });
        }
    }
    const locationData = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        description: req.body.description,
        hoursOfOperation: hoursOfOperation,
        childEquipped: req.body.childEquipped,
        user: req.user._id
    };
    const location = new Location(locationData);
    try {
        await location.save();
        res.redirect('/locations/all');
    } catch (error) {
        console.log(error);
        res.redirect('/locations/new');
    }
}

async function deleteLocation(req, res) {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.redirect('/locations/all');
    } catch (err) {
        console.log(err);
        res.redirect('/locations/all');
    }
}

module.exports = {
    allLocations,
    new: newLocation,
    create,
    show,
    myLocations,
    delete: deleteLocation
}