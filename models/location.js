const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoursOfOperationSchema = new Schema({
    day: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    startHour: {
        type: Number,
        min: 1,
        max: 12
    },
    startAmPm: {
        type: String,
        enum: ['AM', 'PM']
    },
    endHour: {
        type: Number,
        min: 1,
        max: 12
    },    
    endAmPm: {
        type: String,
        enum: ['AM', 'PM']
    }
});

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: String,
    userAvatar: String,
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    }
},{
    timestamps: true
});


const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    description: {
        type: String,
    },
    hoursOfOperation: [hoursOfOperationSchema],
    childEquipped: {
        type: Boolean,
        default: false
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model('Location', locationSchema);