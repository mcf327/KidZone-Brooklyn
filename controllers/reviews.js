const Location = require('../models/location');

async function create(req, res) {
    const location = await Location.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    location.reviews.push(req.body);
    try {
        await location.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/locations/${location._id}`);
}

async function deleteReview(req, res) {
    const location = await Location.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    try {
        location.reviews.remove(req.params.id);
        await location.save();
        res.redirect(`/locations/${location._id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/locations/${location._id}`)
    }
}


module.exports = {
    create,
    delete: deleteReview
}