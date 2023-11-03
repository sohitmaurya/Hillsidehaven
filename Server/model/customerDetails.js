const mongoose = require('mongoose')


const customerDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    totalGuests: {
        type: Number,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    adhaarCard: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    startTime:{
        type:Date,
        require: true
    },
    endTime:{
        type:Date,
        require: true
    },
    totalAmount: {
        type: Number,
        require: true
    },
    rooms: {
        type: Array,
        require: true
    }

})

module.exports = mongoose.model('CustomerDetails', customerDetailsSchema, "customerDetails")