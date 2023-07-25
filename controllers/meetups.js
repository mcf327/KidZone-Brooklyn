const Meetup = require('../models/meetup');
const Location = require('../models/location');

async function allMeetups(req, res) {
    try {
        const meetups = await Meetup.find({})
        .populate('location', 'name')
        .populate('organizer', 'name');
        res.render('meetups/all', { title: 'Meetups', meetups });
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
}

async function newMeetup(req, res) {
    const locations = await Location.find({});
    res.render('meetups/new', { title: 'New Meetup', errorMsg: '', locations});
}

async function create(req, res) {
    const { location, time, comment } = req.body;
    const organizer = req.user._id;
    try {
        const meetup = await Meetup.create({ location, organizer, time, comment });
        res.redirect('/meetups/all');
    } catch (error) {
        console.log(error);
        res.redirect('/meetups/new');
    }
}

module.exports = {
    allMeetups,
    new: newMeetup,
    create
}