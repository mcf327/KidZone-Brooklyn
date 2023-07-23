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
    }
});


module.exports = mongoose.model('Location', locationSchema);