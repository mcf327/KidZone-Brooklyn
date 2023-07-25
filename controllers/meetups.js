const Meetup = require('../models/meetup');
const Location = require('../models/location');

async function allMeetups(req, res) {
    try {
        const meetups = await Meetup.find({})
        .populate('location', 'name')
        .populate('organizer', 'name')
        .populate('attendees', 'name');
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
    const { location, date, time, comment } = req.body;
    const organizer = req.user._id;
    try {
        const meetup = await Meetup.create({ location, organizer, date, time, comment });
        res.redirect('/meetups/all');
    } catch (error) {
        console.log(error);
        res.redirect('/meetups/new');
    }
}

async function deleteMeetup(req, res) {
    try {
        await Meetup.findByIdAndDelete(req.params.id);
        res.redirect('/meetups/all');
    } catch (err) {
        console.log(err);
        res.redirect('/meetups/all');
    }
}

async function signUp(req, res) {
    const meetup = await Meetup.findById(req.params.id).populate('attendees', 'name');
    const userId = req.user._id;
    try { 
        meetup.attendees.push(userId);
        await meetup.save();
        res.redirect('/meetups/all');
    } catch (err) {
        console.log(err);
        res.redirect('/meetups/all');
    }
}

async function removeMe(req, res) {
    const meetup = await Meetup.findById(req.params.id).populate('attendees', 'name');
    const userId = req.user._id;
    
    try {
        meetup.attendees = meetup.attendees.filter((attendeeId) => !attendeeId.equals(userId));
        await meetup.save();
        
        res.redirect('/meetups/all');
    } catch (err) {
        console.log(err);
        res.redirect('/meetups/all');
    }
}

module.exports = {
    allMeetups,
    new: newMeetup,
    create,
    delete: deleteMeetup,
    signUp,
    removeMe
}