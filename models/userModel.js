'use strict'
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    reminderTime: {
        type: String,
    },
    reminderTask: {
        type: String,
    },
    smsSentToday: {
        type: Boolean
    },
    messages: {
        type: Array
    },
    activeUser: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })


userSchema.set('collection', 'Users')
module.exports = mongoose.model("Users", userSchema)