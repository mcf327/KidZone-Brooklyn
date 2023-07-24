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
        res.redirect(`/locations/${location._id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/locations/${location._id}`);
    }
}

async function edit(req, res) {
    const location = await Location.findOne({ 'reviews._id': req.params.reviewId, 'reviews.user': req.user._id });
    const review = location.reviews.id(req.params.reviewId);
    res.render('locations/edit_review', {
        title: 'Edit Review',
        location,
        review
    });
}

async function update(req, res) {
    try {
        const location = await Location.findOne({ 'reviews._id': req.params.reviewId, 'reviews.user': req.user._id });
        const review = location.reviews.id(req.params.reviewId);
        if(!req.user._id.equals(review.user)) {
            return res.status(403).send('You are not authorized to update this review.');
        }
        review.comment = req.body.comment;
        review.rating = req.body.rating;
        await location.save();
        res.redirect(`/locations/${location._id}`);
    } catch (err) {
        console.log(err);
        res.redirect(`/locations/${req.params.id}`);
    }
}

module.exports = {
    create,
    delete: deleteReview,
    edit,
    update
}