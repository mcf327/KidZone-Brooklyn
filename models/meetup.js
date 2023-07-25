const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetupSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Meetup', meetupSchema);