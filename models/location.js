const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    hoursOfOperation: {
        day: {
            type: String,
            enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        startHour: {
            type: Number,
            min: 1,
            max: 12
        },
        startMinute: {
            type: String,
            enum: ['00', '15', '30', '45'],
        },
        startAmPm: {
            type: String,
            enum: ['AM', 'PM']
        },
        endHour: {
            type: String,
            enum: ['AM', 'PM']
        },
        endMinute: {
            type: String,
            enum: ['00', '15', '30', '45']
        },    
        endAmPm: {
            type: String,
            enum: ['AM', 'PM']
        }
    },
    childEquipped: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Location', locationSchema);